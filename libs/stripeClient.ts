/**
 * `getStripe` est une fonction qui charge et retourne une instance du client Stripe.
 * - `loadStripe` charge le client Stripe de manière asynchrone.
 * - `stripePromise` est une promesse qui résout vers l'instance Stripe.
 * Cette fonction est utilisée pour initialiser Stripe une seule fois et réutiliser la même instance.
 */

import { loadStripe, Stripe } from "@stripe/stripe-js"; // Importation des fonctions Stripe

// Initialise la promesse Stripe pour stocker l'instance Stripe
let stripePromise: Promise<Stripe | null>;

// Définit la fonction `getStripe` pour retourner l'instance Stripe
export const getStripe = () => {
    // Vérifie si `stripePromise` n'est pas déjà défini
    if (!stripePromise) {
        // Charge l'instance Stripe de manière asynchrone avec `loadStripe`
        stripePromise = loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '' // Clé publique Stripe
        );
    }

    // Retourne la promesse Stripe
    return stripePromise;
};
