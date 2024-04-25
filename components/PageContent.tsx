"use client";

import { Song } from "@/types";// Importation du composant SongItem depuis le répertoire "@/components/SongItem"
import SongItem from "@/components/SongItem";

// Définition de l'interface PageContentProps pour décrire les propriétés attendues par le composant PageContent
interface PageContentProps {
    // Un tableau de chansons (Song[])
    songs: Song[];
}

// Définition du composant PageContent comme une fonction composant React prenant en paramètre les propriétés de PageContentProps
const PageContent: React.FC<PageContentProps> = ({
                                                     songs
}) => {
    // Vérifie s'il n'y a pas de chansons disponibles
    if (songs.length === 0) {
        // Renvoie un message indiquant qu'il n'y a pas de chansons disponibles si le tableau de chansons est vide
        return (
            <div className="mt-4 text-neutral-400">
                No songs available !
            </div>
        );
    }
    // Renvoie une grille contenant les éléments SongItem si des chansons sont disponibles
    return (
        <div
            className="
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-8
                gap-4
                mt-4
            "
        >
            {/* Mappe chaque élément du tableau de chansons à un composant SongItem */}
            {songs.map((item) => (
                <SongItem
                    // Utilise l'identifiant unique de chaque chanson comme clé
                    key={item.id}
                    onClick={() => {}}
                    // Passe les données de chaque chanson au composant SongItem
                    data={item}
                />
            ))}
        </div>
    );
}


export default PageContent;
