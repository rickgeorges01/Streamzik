/**
 * `getActiveProductsWithPrices` est une fonction qui récupère les produits actifs et leurs prix associés à partir de Supabase.
 * - `createServerComponentClient` crée un client Supabase pour les composants côté serveur.
 * - `cookies` est utilisé pour obtenir l'authentification nécessaire pour accéder aux données.
 * - La fonction retourne une promesse qui résout vers un tableau de produits avec leurs prix (ProductWithPrice[]).
 */

import { ProductWithPrice } from "@/types"; // Importation du type représentant les produits avec leurs prix
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"; // Client Supabase pour les composants serveur
import { cookies } from "next/headers"; // Importation de `cookies` pour l'authentification

// Fonction pour récupérer les produits actifs avec leurs prix
const getActiveProductsWithPrices = async (): Promise<ProductWithPrice[]> => {
    // Crée un client Supabase pour accéder aux données côté serveur
    const supabase = createServerComponentClient({
        cookies: cookies // Utilise les cookies pour l'authentification
    });

    // Récupère les produits et leurs prix à partir de Supabase
    const { data, error } = await supabase
        .from('products') // Sélectionne la table `products`
        .select('*, prices(*)') // Sélectionne toutes les colonnes et les prix associés
        .eq('active', true) // Filtre pour les produits actifs
        .eq('prices.active', true) // Filtre pour les prix actifs
        .order('metadata->index') // Trie par l'index dans les métadonnées
        .order('unit_amount', { foreignTable: 'prices' }); // Trie par le montant unitaire des prix

    // Gère les erreurs de récupération des données
    if (error) {
        console.log(error); // Affiche l'erreur dans la console
    }

    // Retourne les données récupérées sous forme de tableau (ou un tableau vide si aucune donnée n'a été trouvée)
    return (data as any) || [];
};

// Exportation de la fonction pour utilisation ailleurs dans l'application
export default getActiveProductsWithPrices;
