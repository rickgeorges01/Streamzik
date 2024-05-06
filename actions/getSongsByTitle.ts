// Importation de la classe Song depuis le fichier de définition de type dans le répertoire "@/types"
import { Song } from "@/types";
// Importation de la fonction `createServerComponentClient` pour créer un client Supabase côté serveur
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// Importation de l'objet cookies pour gérer les cookies côté serveur
import { cookies } from "next/headers";
// Importation de la fonction `getSongs` pour récupérer toutes les chansons
import getSongs from "@/actions/getSongs";

// Définition de la fonction `getSongsByTitle` qui retourne une promesse d'un tableau de chansons (Song[])
const getSongsByTitle = async (title: string): Promise<Song[]> => {
    // Création d'un client Supabase spécifique au côté serveur
    const supabase = createServerComponentClient({
        // Les cookies sont utilisés pour l'authentification et d'autres fonctionnalités côté serveur
        cookies: cookies
    });

    // Vérification si un titre est fourni en paramètre
    if (!title) {
        // Si aucun titre n'est fourni, récupère toutes les chansons à l'aide de la fonction `getSongs`
        const allSongs = await getSongs();
        // Retourne toutes les chansons
        return allSongs;
    }

    // Récupération des données de la table 'songs' à partir de Supabase
    const { data, error } = await supabase.from('songs')
        // Sélection de toutes les colonnes (*)
        .select('*')
        // Recherche insensible à la casse dans le titre de la chanson
        .ilike('title', `%${title}%`)
        // Tri des résultats par ordre décroissant de la colonne 'created_at'
        .order('created_at', { ascending: false });

    // Gestion des erreurs, si une erreur survient lors de la récupération des données
    if (error) {
        // Affichage de l'erreur dans la console
        console.log(error);
    }

    // Retourne les données récupérées sous forme de tableau (ou un tableau vide si aucune donnée n'a été trouvée)
    return (data as any) || [];
}

// Exportation de la fonction pour utilisation ailleurs dans l'application
export default getSongsByTitle;
