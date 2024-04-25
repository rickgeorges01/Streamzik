import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Song } from "@/types";

// Définition du hook useLoadImage prenant un Song en paramètre et retournant l'URL de son image
const useLoadImage = (song: Song) => {

    const supabaseClient = useSupabaseClient();

    // Vérifie si la chanson est définie
    if (!song) {
        // Renvoie null si la chanson n'est pas définie
        return null;
    }

    // Utilisation du client Supabase pour obtenir l'URL publique de l'image de la chanson depuis le stockage
    const { data: imageData } = supabaseClient.storage
        // Sélectionne le conteneur d'images dans le stockage
        .from('images')
        // Récupère l'URL publique de l'image associée au chemin de l'image de la chanson
        .getPublicUrl(song.image_path);

    // Renvoie l'URL publique de l'image de la chanson
    return imageData?.publicUrl;
}


export default useLoadImage;
