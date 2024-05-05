import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useSubscribeModal from "@/hooks/useSubscribeModal";

// Définit le hook personnalisé useOnPlay
const useOnPlay = (songs: Song[]) => {
    // Récupère l'état du lecteur audio en utilisant usePlayer
    const player = usePlayer();
    // Récupère l'état du modal d'authentification en utilisant useAuthModal
    const authModal = useAuthModal();
    // Récupère l'utilisateur en cours en utilisant useUser
    const { user,subscription } = useUser();
    const subscribeModal = useSubscribeModal();


    // Définit la fonction onPlay qui sera renvoyée par le hook
    const onPlay = (id: string) => {
        // Vérifie si aucun utilisateur n'est connecté
        if (!user) {
            // Si aucun utilisateur n'est connecté, ouvre le modal d'authentification
            return authModal.onOpen();
        }
        if(!subscription){
            return subscribeModal.onOpen();
        }
        // Définit l'identifiant de la piste audio à lire dans le lecteur audio
        player.setId(id);
        // Définit les identifiants de toutes les pistes audio à lire dans le lecteur audio en fonction de l'emplacemnt (Liked, library etc...)
        player.setIds(songs.map((song) => song.id));
    };

    // Renvoie la fonction onPlay
    return onPlay;
};

export default useOnPlay; // Exporte le hook useOnPlay
