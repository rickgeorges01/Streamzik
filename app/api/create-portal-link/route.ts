/**
 * Ce fichier définit un gestionnaire pour créer une session de portail de facturation Stripe.
 * - Utilise `POST` comme méthode HTTP pour recevoir les requêtes.
 * - Récupère les informations utilisateur via Supabase.
 * - Utilise le client Stripe pour créer une session de portail de facturation.
 * - Retourne une réponse JSON contenant l'URL de redirection du portail.
 */

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"; // Crée un client Supabase pour gérer les routes
import { cookies } from "next/headers"; // Importation de `cookies` pour l'authentification
import { NextResponse } from "next/server"; // Création de réponses HTTP

import { stripe } from "@/libs/stripe"; // Importation du client Stripe configuré
import { getURL } from "@/libs/helpers"; // Fonction pour récupérer l'URL de base du site
import { createOrRetrieveCustomer } from "@/libs/supabaseAdmin"; // Fonction pour gérer les clients dans Supabase

// Gestionnaire de requêtes POST
export async function POST() {
    try {
        // Crée un client Supabase pour gérer les routes
        const supabase = createRouteHandlerClient({
            cookies
        });

        // Récupère les données utilisateur à partir de Supabase
        const { data: { user } } = await supabase.auth.getUser();

        // Si l'utilisateur n'est pas trouvé, lance une erreur
        if (!user) throw new Error('Could not get user');

        // Crée ou récupère le client Stripe associé à l'utilisateur
        const customer = await createOrRetrieveCustomer({
            uuid: user.id || '',
            email: user.email || '',
        });

        // Si le client n'est pas trouvé, lance une erreur
        if (!customer) throw new Error('Could not get customer');

        // Crée une session de portail de facturation Stripe
        const { url } = await stripe.billingPortal.sessions.create({
            customer, // Associe la session au client Stripe
            return_url: `${getURL()}/account` // URL de redirection en cas de retour
        });

        // Retourne l'URL de redirection du portail
        return NextResponse.json({ url });
    } catch (error: any) {
        // Gère les erreurs et retourne une réponse HTTP 500
        console.log('error');
        return new NextResponse('Internal Error', { status: 500 });
    }
}
