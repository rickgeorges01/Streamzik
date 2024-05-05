// Importation de la classe ProductWithPrice depuis le fichier de définition de type (types.ts ?) dans le répertoire "@/types"
import {ProductWithPrice} from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// Importation de l'objet cookies depuis le module "next/headers"
import { cookies } from "next/headers";

// Définition de la fonction getSongs qui retourne une promesse d'un tableau de Produit et prix (ProductWithPrice[])
const getActiveProductsWithPrices = async (): Promise<ProductWithPrice[]> => {

    // En passant l'objet cookies en tant qu'option lors de la création du client Supabase
    const supabase = createServerComponentClient({
        cookies: cookies // Les cookies sont utilisés pour l'authentification et d'autres fonctionnalités côté serveur
    });

    // Récupération des données de la table 'products' à partir de Supabase
    const { data, error } = await supabase.from('products')
        // Sélection de toutes les colonnes (*)
        .select('*,prices(*)')
        .eq('active',true)
        .eq('prices.active',true)
        .order('metadata->index')
        .order('unit_amount', { foreignTable: 'prices' });

    // Gestion des erreurs, si une erreur survient lors de la récupération des données
    if (error) {
        // Affichage de l'erreur dans la console
        console.log(error);
    }

    // Retourne les données récupérées sous forme de tableau (ou un tableau vide si aucune donnée n'a été trouvée)
    return (data as any) || [];
};

export default getActiveProductsWithPrices;
