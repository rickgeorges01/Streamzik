// Importation de la classe Song depuis le fichier de définition de type (types.ts ?) dans le répertoire "@/types"
import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Définition de la fonction getSongs qui retourne une promesse d'un tableau de chansons (Song[])
const getSongs = async (): Promise<Song[]> => {

    // En passant l'objet cookies en tant qu'option
    const supabase = createServerComponentClient({
        cookies: cookies
    });
    // Récupération des données de la table 'songs' à partir de Supabase
    const { data, error } = await supabase.from('songs')
        // Sélection de toutes les colonnes (*)
        .select('*')
        // Tri des résultats par ordre décroissant de la colonne 'created_at'
        .order('created_at', { ascending: false });

    if (error) {
        // Affichage de l'erreur dans la console
        console.log(error);
    }
    // Retourne les données récupérées sous forme de tableau (ou un tableau vide si aucune donnée n'a été trouvée)
    return (data as any) || [];
};


export default getSongs;
