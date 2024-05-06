/**
 * `useOnPlay` est un hook personnalisé qui gère la logique de lecture des chansons.
 * - `usePlayer` fournit l'accès au lecteur audio pour gérer la lecture.
 * - `useAuthModal` gère l'ouverture du modal d'authentification si nécessaire.
 * - `useUser` permet de vérifier si un utilisateur est connecté et d'obtenir ses informations.
 * - `useSubscribeModal` ouvre le modal d'abonnement si l'utilisateur n'est pas abonné.
 * Ce hook est utilisé pour déclencher la lecture des chansons tout en gérant les conditions d'accès.
 */

// Importation des types et hooks nécessaires
import { Song } from "@/types"; // Type représentant une chanson
import usePlayer from "@/hooks/usePlayer"; // Hook pour accéder aux informations du lecteur
import useAuthModal from "@/hooks/useAuthModal"; // Hook pour gérer le modal d'authentification
import { useUser } from "@/hooks/useUser"; // Hook pour accéder aux informations de l'utilisateur
import useSubscribeModal from "@/hooks/useSubscribeModal"; // Hook pour gérer le modal d'abonnement

// Définition du hook `useOnPlay`
const useOnPlay = (songs: Song[]) => {
    // Récupère l'état du lecteur audio
    const player = usePlayer();
    // Récupère l'état du modal d'authentification
    const authModal = useAuthModal();
    // Récupère l'utilisateur en cours et l'abonnement
    const { user, subscription } = useUser();
    const subscribeModal = useSubscribeModal();

    // Définit la fonction `onPlay` pour gérer la lecture
    const onPlay = (id: string) => {
        // Vérifie si aucun utilisateur n'est connecté
        if (!user) {
            // Ouvre le modal d'authentification si aucun utilisateur n'est connecté
            return authModal.onOpen();
        }

        // Vérifie si l'utilisateur n'est pas abonné
        if (!subscription) {
            // Ouvre le modal d'abonnement si l'utilisateur n'est pas abonné
            return subscribeModal.onOpen();
        }

        // Définit l'identifiant de la piste audio à lire dans le lecteur
        player.setId(id);

        // Définit les identifiants de toutes les pistes audio à lire
        player.setIds(songs.map((song) => song.id));
    };

    // Retourne la fonction `onPlay`
    return onPlay;
};

// Exportation du hook pour utilisation ailleurs dans l'application
export default useOnPlay;
