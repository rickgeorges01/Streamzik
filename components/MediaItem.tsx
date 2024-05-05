//Présentations des songs sur la partie gauche de l'interface
"use client"

import {Song} from "@/types";
import useLoadImage from "@/hooks/UseLoadImage";
import Image from "next/image";

// Définition des propriétés attendues par le composant MediaItem
interface MediaItemProps {
    // Propriété data de type Song représentant les données de la chanson
    data: Song;
    // Propriété optionnelle onClick qui prend une chaîne en argument et retourne void
    onClick?: (id: string) => void;

}

const MediaItem: React.FC<MediaItemProps> = ({
                                                 data,
                                                 onClick
                                             }) => {
    const imageUrl = useLoadImage(data);
    const handleClick = () => {
        if (onClick) {
            return onClick(data.id)
        }
        //Todo:default turn on player
    }
    return (
        <div
            onClick={handleClick}
            className="
                flex
                items-center
                gap-x-3
                cursor-pointer
                hover:bg-neutral-800/50
                w-full
                p-2
                rounded-md
            "
        >
            <div
                className="
                    relative
                    rounded-md
                    min-h-[48px]
                    min-w-[48px]
                    overflow-hidden
                "
            >
                <Image
                    src={imageUrl || '/images/liked.png'}
                    alt="Media Item"
                    fill
                    className="object-cover"
                />
            </div>
            <div
                className="
                    flex
                    flex-col
                    gap-y-1
                    overflow-hidden
                "
            >
                <p className="text-white truncate">
                    {data.title}
                </p>
                <p className="text-neutral-400 text-sm truncate">
                    {data.author}
                </p>

            </div>

        </div>
    );
}
export default MediaItem;
