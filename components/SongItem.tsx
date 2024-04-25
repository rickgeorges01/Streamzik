"use client";

import { Song } from "@/types";
import useLoadImage from "@/hooks/UseLoadImage";
import Image from "next/image";
import PlayButton from "@/components/PlayButton";

// Définition de l'interface SongItemProps pour décrire les propriétés attendues par le composant SongItem
interface SongItemProps {
    // Les données de la chanson (Song)
    data: Song;
    // La fonction à appeler lorsqu'un clic est effectué sur le composant
    onClick: (id: string) => void;
}

// Définition du composant SongItem comme une fonction composant React prenant en paramètre les propriétés de SongItemProps
const SongItem: React.FC<SongItemProps> = ({
                                               data, onClick
}) => {
    // Utilisation du hook useLoadImage pour charger l'URL de l'image associée à la chanson
    const imagePath = useLoadImage(data);

    // Renvoie le JSX du composant SongItem
    return (
        <div
            // Gère l'événement onClick en appelant la fonction onClick avec l'ID de la chanson en argument
            onClick={() => onClick(data.id)}
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
                    // Utilise l'URL de l'image chargée ou une image de remplacement par défaut
                    src={imagePath || '/images/liked.png'}
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
            {/* Affiche le bouton de lecture de la chanson */}
            <div
                className="
                    absolute
                    bottom-24
                    right-5
                "
            >
                <PlayButton/>
            </div>
        </div>
    );
}


export default SongItem;
