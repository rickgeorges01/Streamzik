/**
 * Ce fichier définit un gestionnaire pour les webhooks Stripe.
 * - `relevantEvents` est un ensemble des types d'événements pertinents à traiter.
 * - `POST` gère les requêtes POST envoyées par les webhooks Stripe.
 * - Utilise les fonctions `upsertProductRecord`, `upsertPriceRecord` et `manageSubscriptionStatusChange` pour gérer les différents types d'événements.
 */

import Stripe from "stripe"; // Importation du package Stripe
import { NextResponse } from "next/server"; // Importation de NextResponse pour créer des réponses HTTP
import { headers } from "next/headers"; // Importation de `headers` pour accéder aux en-têtes de la requête
import { stripe } from "@/libs/stripe"; // Importation du client Stripe configuré
import {
    upsertProductRecord,
    upsertPriceRecord,
    manageSubscriptionStatusChange
} from "@/libs/supabaseAdmin"; // Importation des fonctions pour gérer les enregistrements Supabase

// Définit les types d'événements pertinents à traiter
const relevantEvents = new Set([
    'product.created',
    'product.updated',
    'price.created',
    'price.updated',
    'checkout.session.completed',
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.subscription.deleted',
]);

// Gère les requêtes POST envoyées par les webhooks Stripe
export async function POST(request: Request) {
    // Récupère le corps de la requête et la signature Stripe
    const body = await request.text();
    const sig = headers().get('Stripe-Signature');

    // Récupère le secret du webhook Stripe à partir des variables d'environnement
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event: Stripe.Event;

    try {
        // Vérifie si la signature ou le secret du webhook est manquant
        if (!sig || !webhookSecret) return;

        // Construit l'événement Stripe en utilisant le corps de la requête, la signature et le secret du webhook
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (error: any) {
        // Gère les erreurs de construction de l'événement
        console.log('Error message: ' + error.message);
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    // Vérifie si l'événement fait partie des types pertinents
    if (relevantEvents.has(event.type)) {
        try {
            // Gère les différents types d'événements
            switch (event.type) {
                case 'product.created':
                case 'product.updated':
                    // Insère ou met à jour les enregistrements de produit
                    await upsertProductRecord(event.data.object as Stripe.Product);
                    break;
                case 'price.created':
                case 'price.updated':
                    // Insère ou met à jour les enregistrements de prix
                    await upsertPriceRecord(event.data.object as Stripe.Price);
                    break;
                case 'customer.subscription.created':
                case 'customer.subscription.updated':
                case 'customer.subscription.deleted':
                    // Gère les changements d'état des abonnements
                    const subscription = event.data.object as Stripe.Subscription;
                    await manageSubscriptionStatusChange(
                        subscription.id,
                        subscription.customer as string,
                        event.type === 'customer.subscription.created'
                    );
                    break;
                case 'checkout.session.completed':
                    // Gère les sessions de paiement terminées
                    const checkoutSession = event.data.object as Stripe.Checkout.Session;
                    if (checkoutSession.mode === 'subscription') {
                        const subscriptionId = checkoutSession.subscription;
                        await manageSubscriptionStatusChange(
                            subscriptionId as string,
                            checkoutSession.customer as string,
                            true
                        );
                    }
                    break;
                default:
                    // Lance une erreur pour les types d'événements non pris en charge
                    throw new Error('Unhandled relevant event!');
            }
        } catch (error) {
            // Gère les erreurs lors du traitement de l'événement
            console.log(error);
            return new NextResponse('Webhook error', { status: 400 });
        }
    }

    // Retourne une réponse JSON pour indiquer que l'événement a été reçu
    return NextResponse.json({ received: true }, { status: 200 });
}
