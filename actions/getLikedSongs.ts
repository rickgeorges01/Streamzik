/**
 * `getLikedSongs` est une fonction asynchrone qui récupère les chansons aimées par l'utilisateur actuellement connecté.
 * Elle interroge la base de données Supabase pour trouver les chansons marquées comme aimées par l'utilisateur,
 * en utilisant les cookies pour s'authentifier et identifier l'utilisateur.
 * - `supabase.auth.getSession` récupère la session utilisateur actuelle.
 * - `supabase.from('liked_songs')` récupère les chansons aimées en filtrant par ID utilisateur.
 * Cette fonction est utilisée pour afficher les chansons aimées dans l'interface utilisateur.
 */

// Importation des types et fonctions nécessaires
import { Song } from "@/types"; // Type représentant une chanson
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"; // Crée un client Supabase côté serveur
import { cookies } from "next/headers"; // Fournit l'accès aux cookies côté serveur

// Définition de la fonction `getLikedSongs` qui retourne une promesse d'un tableau de chansons (Song[])
const getLikedSongs = async (): Promise<Song[]> => {
    // Création d'un client Supabase côté serveur avec les cookies
    const supabase = createServerComponentClient({
        cookies: cookies // Utilise les cookies pour l'authentification
    });

    // Récupération de la session utilisateur à partir du client Supabase
    const {
        data: { session }
    } = await supabase.auth.getSession();

    // Récupération des chansons aimées depuis la table 'liked_songs'
    const { data, error } = await supabase
        .from('liked_songs')
        .select('*, songs(*)') // Sélectionne toutes les colonnes et les chansons associées
        .eq('user_id', session?.user?.id) // Filtre par ID utilisateur
        .order('created_at', { ascending: false }); // Trie par date de création décroissante

    // Gestion des erreurs si une erreur survient lors de la récupération des données
    if (error) {
        console.log(error); // Affiche l'erreur dans la console
        return []; // Retourne un tableau vide en cas d'erreur
    }

    if (!data) {
        return []; // Retourne un tableau vide si aucune donnée n'est trouvée
    }

    // Retourne les chansons récupérées, extrayant les données de la table `songs`
    return data.map((item) => ({
        ...item.songs
    }));
}

// Exportation de la fonction pour utilisation ailleurs dans l'application
export default getLikedSongs;
