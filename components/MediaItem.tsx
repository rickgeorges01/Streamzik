// "use client" : Directive indiquant que ce composant s'exécute côté client
"use client"

// Importation des modules nécessaires
import { Song } from "@/types"; // Type représentant une chanson
import useLoadImage from "@/hooks/UseLoadImage"; // Hook personnalisé pour charger l'URL de l'image
import Image from "next/image"; // Composant Image de Next.js pour gérer les images
import usePlayer from "@/hooks/usePlayer"; // Hook pour gérer le lecteur de musique

// Définition des propriétés attendues par le composant MediaItem
interface MediaItemProps {
    data: Song; // Propriété `data` de type Song représentant les données de la chanson
    onClick?: (id: string) => void; // Propriété optionnelle onClick qui prend une chaîne en argument et retourne void
}

// Définition du composant MediaItem
// Fonctionnalité : Affiche un élément média représentant une chanson avec son image, son titre, son auteur
const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
    // Utilisation du hook useLoadImage pour obtenir l'URL de l'image
    const imageUrl = useLoadImage(data);

    // Utilisation du hook usePlayer pour gérer le lecteur de musique
    const player = usePlayer();

    // Gestionnaire de clic sur l'élément
    const handleClick = () => {
        if (onClick) {
            // Si une fonction onClick est définie, l'appelle avec l'ID de la chanson
            return onClick(data.id);
        }
        // Sinon, utilise le lecteur pour jouer la chanson
        return player.setId(data.id);
    }

    // Rendu du composant MediaItem
    return (
        <div
            onClick={handleClick} // Attache le gestionnaire de clic
            className="
                flex // Utilisation de flexbox pour aligner les éléments
                items-center // Centre les éléments verticalement
                gap-x-3 // Espacement horizontal entre les éléments
                cursor-pointer // Indique que l'élément est cliquable
                hover:bg-neutral-800/50 // Change l'arrière-plan au survol
                w-full // Occupe toute la largeur
                p-2 // Padding intérieur
                rounded-md // Bords arrondis
            "
        >
            {/* Affichage de l'image */}
            <div
                className="
                    relative // Pour positionner l'image avec `fill`
                    rounded-md // Bords arrondis
                    min-h-[48px] // Hauteur minimale
                    min-w-[48px] // Largeur minimale
                    overflow-hidden // Coupe l'image qui dépasse
                "
            >
                <Image
                    src={imageUrl || '/images/liked.png'} // Affiche l'image ou une image par défaut
                    alt="Media Item"
                    fill // Remplit le conteneur
                    className="object-cover" // Couvre le conteneur avec l'image
                />
            </div>

            {/* Affichage du titre et de l'auteur */}
            <div
                className="
                    flex // Alignement vertical
                    flex-col // Les éléments s'empilent verticalement
                    gap-y-1 // Espacement vertical entre les éléments
                    overflow-hidden // Coupe le texte qui dépasse
                "
            >
                <p className="text-white truncate">
                    {data.title} {/* Affiche le titre de la chanson */}
                </p>
                <p className="text-neutral-400 text-sm truncate">
                    {data.author} {/* Affiche l'auteur de la chanson */}
                </p>
            </div>
        </div>
    );
}

// Exportation du composant pour utilisation ailleurs dans l'application
export default MediaItem;
