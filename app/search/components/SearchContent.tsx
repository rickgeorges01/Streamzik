// "use client" : Directive indiquant que ce composant s'exécute côté client
"use client"

// Importation des modules nécessaires
import { Song } from "@/types"; // Type représentant une chanson
import MediaItem from "@/components/MediaItem"; // Composant pour afficher les détails d'une chanson
import LikeButton from "@/components/LikeButton"; // Composant pour gérer les likes sur les chansons
import useOnPlay from "@/hooks/useOnPlay"; // Hook personnalisé pour gérer la lecture des chansons

// Définition de l'interface SearchContentProps pour décrire les propriétés attendues par le composant SearchContent
interface SearchContentProps {
    songs: Song[]; // Un tableau de chansons
}

// Définition du composant SearchContent
// Fonctionnalité : Affiche une liste de chansons ou un message si aucune chanson n'est trouvée
const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
    // Utilisation du hook personnalisé pour gérer la lecture des chansons
    const onPlay = useOnPlay(songs);

    // Si aucune chanson n'est trouvée, affiche un message
    if (songs.length === 0) {
        return (
            <div
                className="
                    flex // Alignement vertical
                    flex-col // Les éléments s'empilent verticalement
                    gap-y-2 // Espacement vertical entre les éléments
                    w-full // Occupe toute la largeur
                    px-6 // Padding horizontal
                    text-neutral-400 // Texte grisé
                "
            >
                No songs found! {/* Message affiché */}
            </div>
        );
    }

    // Rendu du composant SearchContent
    return (
        <div
            className="
                flex // Alignement vertical
                flex-col // Les éléments s'empilent verticalement
                gap-y-2 // Espacement vertical entre les éléments
                w-full // Occupe toute la largeur
                px-6 // Padding horizontal
            "
        >
            {/* Mappe chaque élément du tableau de chansons à un composant MediaItem */}
            {songs.map((song) => (
                <div
                    key={song.id} // Utilise l'identifiant unique de chaque chanson comme clé
                    className="flex items-center gap-x-4 w-full"
                >
                    {/* Affichage du composant MediaItem */}
                    <div className="flex-1">
                        <MediaItem
                            onClick={(id: string) => onPlay(id)}
                            data={song}
                        />
                    </div>

                    {/* Affichage du bouton LikeButton */}
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
    );
}

// Exportation du composant pour utilisation ailleurs dans l'application
export default SearchContent;
