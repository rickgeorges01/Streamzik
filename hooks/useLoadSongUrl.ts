import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";


// Définit le hook personnalisé useLoadSongUrl
const useLoadSongUrl = (song: Song) => {
    // Récupère le client Supabase en utilisant useSupabaseClient
    const supabaseClient = useSupabaseClient();

    // Vérifie si la chanson est définie
    if (!song) {
        // Si la chanson n'est pas définie, retourne une chaîne vide
        return '';
    }

    // Effectue une requête pour obtenir l'URL public de la chanson à partir du stockage Supabase
    const { data: songData } = supabaseClient
        .storage
        .from('songs')
        // Obtient l'URL public en utilisant le chemin de la chanson
        .getPublicUrl(song.song_path);

    // Retourne l'URL public de la chanson
    return songData.publicUrl;
};

export default useLoadSongUrl;
