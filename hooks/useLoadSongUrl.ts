/**
 * `useLoadSongUrl` est un hook personnalisé qui récupère l'URL publique d'une chanson stockée dans Supabase.
 * - `useSupabaseClient` fournit le client Supabase pour interagir avec le stockage.
 * - Vérifie si la chanson est définie avant d'effectuer la requête.
 * - `supabaseClient.storage.from('songs').getPublicUrl` récupère l'URL publique de la chanson.
 * - Retourne l'URL publique de la chanson récupérée.
 * Ce hook est utilisé pour obtenir l'URL publique d'une chanson afin de la lire dans l'application.
 */

// Importation des types et hooks nécessaires
import { Song } from "@/types"; // Type représentant une chanson
import { useSupabaseClient } from "@supabase/auth-helpers-react"; // Hook pour interagir avec Supabase

// Définition du hook `useLoadSongUrl`
const useLoadSongUrl = (song: Song) => {
    // Obtient le client Supabase en utilisant `useSupabaseClient`
    const supabaseClient = useSupabaseClient();

    // Vérifie si la chanson est définie
    if (!song) {
        // Retourne une chaîne vide si la chanson n'est pas définie
        return '';
    }

    // Effectue une requête pour obtenir l'URL publique de la chanson
    const { data: songData } = supabaseClient
        .storage // Accède au stockage Supabase
        .from('songs') // Sélectionne le bucket 'songs'
        // Obtient l'URL publique de la chanson à partir de son chemin
        .getPublicUrl(song.song_path);

    // Retourne l'URL publique de la chanson
    return songData.publicUrl;
};

// Exportation du hook pour utilisation ailleurs dans l'application
export default useLoadSongUrl;
