// Importation du type Song depuis le fichier de définition des types (types.ts)
import { Song } from "@/types";

// Importation de la fonction createServerComponentClient pour créer un client Supabase côté serveur
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// Importation de l'objet cookies pour gérer les cookies côté serveur
import { cookies } from "next/headers";

// Définition de la fonction getSongs qui retourne une promesse d'un tableau de chansons (Song[])
const getSongs = async (): Promise<Song[]> => {

    // Création d'un client Supabase côté serveur avec les cookies
    const supabase = createServerComponentClient({
        cookies: cookies // Les cookies sont utilisés pour l'authentification et d'autres fonctionnalités côté serveur
    });

    // Récupération des données de la table 'songs' à partir de Supabase
    const { data, error } = await supabase.from('songs')
        // Sélection de toutes les colonnes (*)
        .select('*')
        // Tri des résultats par ordre décroissant de la colonne 'created_at'
        .order('created_at', { ascending: false });

    // Gestion des erreurs, si une erreur survient lors de la récupération des données
    if (error) {
        // Affichage de l'erreur dans la console
        console.log(error);
    }

    // Retourne les données récupérées sous forme de tableau (ou un tableau vide si aucune donnée n'a été trouvée)
    return (data as any) || [];
};

// Exportation de la fonction getSongs pour l'utiliser ailleurs dans l'application
export default getSongs;
