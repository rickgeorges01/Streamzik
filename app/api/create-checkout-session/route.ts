/**
 * Ce fichier gère la création d'une session de paiement Stripe.
 * - Utilise `POST` comme méthode HTTP pour recevoir les requêtes.
 * - Interagit avec Supabase pour récupérer les informations utilisateur.
 * - Utilise le client Stripe pour créer une session de paiement.
 * - Retourne une réponse JSON contenant l'identifiant de la session créée.
 */

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"; // Crée un client Supabase pour gérer les routes
import { cookies } from "next/headers"; // Importation de `cookies` pour l'authentification
import { NextResponse } from "next/server"; // Création de réponses HTTP

import { stripe } from "@/libs/stripe"; // Importation du client Stripe configuré
import { getURL } from "@/libs/helpers"; // Fonction pour récupérer l'URL de base du site
import { createOrRetrieveCustomer } from "@/libs/supabaseAdmin"; // Fonction pour gérer les clients dans Supabase

// Gestionnaire de requêtes POST
export async function POST(request: Request) {
    // Récupère les données de la requête
    const { price, quantity = 1, metadata = {} } = await request.json();

    try {
        // Crée un client Supabase pour gérer les routes
        const supabase = createRouteHandlerClient({
            cookies,
        });

        // Récupère les données utilisateur à partir de Supabase
        const { data: { user } } = await supabase.auth.getUser();

        // Crée ou récupère le client Stripe associé à l'utilisateur
        const customer = await createOrRetrieveCustomer({
            uuid: user?.id || '',
            email: user?.email || '',
        });

        // Crée une session de paiement Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"], // Autorise les paiements par carte
            billing_address_collection: 'required', // Demande l'adresse de facturation
            customer, // Associe la session au client Stripe
            line_items: [
                {
                    price: price.id, // Associe le prix au produit
                    quantity // Définit la quantité
                }
            ],
            mode: 'subscription', // Définit le mode d'achat
            allow_promotion_codes: 'true', // Permet l'utilisation de codes promotionnels
            subscription_data: {
                trial_from_plan: true, // Utilise le plan d'essai
                metadata // Ajoute les métadonnées
            },
            success_url: `${getURL()}/account`, // URL de redirection en cas de succès
            cancel_url: `${getURL()}` // URL de redirection en cas d'annulation
        });

        // Retourne l'identifiant de la session créée
        return NextResponse.json({ sessionId: session.id });
    } catch (error: any) {
        // Gère les erreurs et retourne une réponse HTTP 500
        console.log(error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
