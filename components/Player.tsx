/**
 * `Player` est un composant qui gère la lecture de la chanson actuellement sélectionnée par l'utilisateur.
 * - `usePlayer` fournit l'accès aux informations du lecteur, notamment la chanson active.
 * - `useGetsSongById` récupère les détails de la chanson actuellement active.
 * - `useLoadSongUrl` charge l'URL de la chanson pour la lecture.
 * - `PlayerContent` affiche les contrôles du lecteur et les détails de la chanson.
 * Ce composant est utilisé pour offrir un lecteur de musique intégré dans l'application.
 */

"use client"

// Importation des hooks et composants nécessaires
import usePlayer from "@/hooks/usePlayer"; // Hook pour accéder aux informations du lecteur
import useGetsSongById from "@/hooks/useGetsSongById"; // Hook pour obtenir les détails de la chanson
import useLoadSongUrl from "@/hooks/useLoadSongUrl"; // Hook pour charger l'URL de la chanson
import PlayerContent from "@/components/PlayerContent"; // Composant pour afficher les contrôles du lecteur

// Définition du composant `Player`
const Player = () => {
    // Initialisation des hooks
    const player = usePlayer(); // Pour accéder aux informations du lecteur
    const { song } = useGetsSongById(player.activeId); // Récupère la chanson active

    const songUrl = useLoadSongUrl(song!); // Charge l'URL de la chanson

    // Vérifie si la chanson ou l'URL n'existe pas ou si aucun ID n'est actif
    if (!song || !songUrl || !player.activeId) {
        return null; // Ne rien afficher si la chanson ne peut pas être lue
    }

    // Rendu du composant `Player`
    return (
        <div
            className="
                fixed // Reste fixe au bas de la page
                bottom-0 // Aligné en bas
                bg-black // Fond noir
                w-full // Largeur complète
                py-2 // Padding vertical
                h-[80px] // Hauteur fixe de 80px
                px-4 // Padding horizontal
            "
        >
            {/* Affiche le contenu du lecteur */}
            <PlayerContent
                key={songUrl} // Clé unique pour le composant basé sur l'URL
                song={song} // Passe les détails de la chanson
                songUrl={songUrl} // Passe l'URL de la chanson
            />
        </div>
    );
}

// Exportation du composant pour utilisation ailleurs dans l'application
export default Player;
