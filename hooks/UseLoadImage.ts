// Importation du hook `useSupabaseClient` pour accéder au client Supabase
import { useSupabaseClient } from "@supabase/auth-helpers-react";
// Importation du type `Song` depuis les types définis
import { Song } from "@/types";

// Définition du hook `useLoadImage` prenant un Song en paramètre et retournant l'URL de son image
const useLoadImage = (song: Song) => {
    // Initialisation du client Supabase
    const supabaseClient = useSupabaseClient();

    // Vérifie si la chanson est définie
    if (!song) {
        // Retourne `null` si la chanson n'est pas définie
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

// Exportation du hook pour utilisation dans d'autres parties de l'application
export default useLoadImage;
