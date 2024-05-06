// "use client" : Directive indiquant que ce composant s'exécute côté client
"use client";

// Importation des modules nécessaires
import { Song } from "@/types"; // Type représentant une chanson
import useLoadImage from "@/hooks/UseLoadImage"; // Hook personnalisé pour charger l'URL de l'image
import Image from "next/image"; // Composant Image de Next.js pour gérer les images
import PlayButton from "@/components/PlayButton"; // Composant bouton de lecture

// Définition de l'interface SongItemProps pour décrire les propriétés attendues par le composant SongItem
interface SongItemProps {
    data: Song; // Les données de la chanson (Song)
    onClick: (id: string) => void; // Fonction à appeler lors du clic sur l'élément
}

// Définition du composant SongItem
// Fonctionnalité : Affiche les détails d'une chanson, y compris son image, titre et auteur, ainsi qu'un bouton de lecture
const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
    // Utilisation du hook useLoadImage pour charger l'URL de l'image associée à la chanson
    const imagePath = useLoadImage(data);

    // Rendu du composant SongItem
    return (
        <div
            onClick={() => onClick(data.id)} // Gestion du clic sur l'élément
            className="
                relative
                group
                flex
                flex-col
                items-center
                justify-center
                rounded-md
                overflow-hidden
                gap-x-4
                bg-neutral-400/5
                cursor-pointer
                hover:bg-neutral-400/10
                transition
                p-3
            "
        >
            <div
                className="
                    relative
                    aspect-square
                    w-full
                    h-full
                    rounded-md
                    overflow-hidden
                "
            >
                {/* Affiche l'image de la chanson */}
                <Image
                    className="object-cover"
                    src={imagePath || '/images/liked.png'} // Utilise l'URL de l'image ou une image par défaut
                    fill
                    alt="Image"
                />
            </div>

            <div className="flex flex-col items-start w-full p-4 gap-y-1">
                <p className="font-semibold truncate w-full">
                    {data.title} {/* Affiche le titre de la chanson */}
                </p>
                <p
                    className="
                        text-neutral-500
                        text-sm
                        pb-4
                        w-full
                        truncate
                    "
                >
                    By {data.author} {/* Affiche l'auteur de la chanson */}
                </p>
            </div>

            {/* Affiche le bouton de lecture */}
            <div
                className="
                    absolute
                    bottom-24
                    right-5
                "
            >
                <PlayButton />
            </div>
        </div>
    );
}

// Exportation du composant pour utilisation ailleurs dans l'application
export default SongItem;
