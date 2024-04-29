/**
 * Middleware pour la gestion de l'authentification avec Supabase dans Next.js.
 * Ce middleware intercepte les requêtes pour vérifier la session de l'utilisateur via Supabase,
 * assurant que l'utilisateur est authentifié avant de poursuivre le traitement de la requête.
 * - `createMiddlewareClient` configure une instance de Supabase adaptée aux interactions dans un environnement middleware.
 * - `supabase.auth.getSession()` récupère la session de l'utilisateur, permettant de gérer l'accès en fonction de l'état de l'authentification.
 * Utilisé principalement pour sécuriser les routes et les fonctionnalités qui nécessitent une vérification de l'authentification utilisateur.
 */




// Importation de la fonction createMiddlewareClient depuis le package "@supabase/auth-helpers-nextjs"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
// Importation des types NextRequest et NextResponse depuis le module "next/server"
import { NextRequest, NextResponse } from "next/server";

// Définition de la fonction middleware
export async function middleware(req: NextRequest){
    // Création d'une réponse Next.js
    const res = NextResponse.next();

    // Création d'un client Supabase spécifique pour les middlewares d'authentification
    const supabase = createMiddlewareClient({
        // Passage de la requête et de la réponse en tant qu'options
        req,  // La requête actuelle
        res   // La réponse à envoyer
    });

    // Récupération de la session de l'utilisateur à partir de Supabase
    await supabase.auth.getSession();
};
