// "use client" : Directive indiquant que ce composant s'exécute côté client
"use client";

// Importation des modules nécessaires
import { Song } from "@/types"; // Type représentant une chanson
import SongItem from "@/components/SongItem"; // Composant pour afficher les détails d'une chanson
import useOnPlay from "@/hooks/useOnPlay"; // Hook personnalisé pour gérer la lecture de chansons

// Définition de l'interface PageContentProps pour décrire les propriétés attendues par le composant PageContent
interface PageContentProps {
    songs: Song[]; // Un tableau de chansons
}

// Définition du composant PageContent
// Fonctionnalité : Affiche une liste de chansons ou un message si aucune chanson n'est disponible
const PageContent: React.FC<PageContentProps> = ({ songs }) => {
    // Obtient une fonction de gestion de la lecture de chansons en utilisant le hook personnalisé
    const onPlay = useOnPlay(songs);

    // Si aucune chanson n'est disponible, affiche un message indiquant l'absence de chansons
    if (songs.length === 0) {
        return (
            <div className="mt-4 text-neutral-400">
                No songs available !
            </div>
        );
    }

    // Rendu du composant PageContent
    // Affiche les chansons disponibles en utilisant une grille
    return (
        <div
            className="
                grid // Utilisation d'une grille CSS
                grid-cols-2 // Deux colonnes par défaut
                sm:grid-cols-3 // Trois colonnes sur les petits écrans
                md:grid-cols-3 // Trois colonnes sur les écrans moyens
                lg:grid-cols-4 // Quatre colonnes sur les écrans larges
                xl:grid-cols-5 // Cinq colonnes sur les très larges écrans
                2xl:grid-cols-8 // Huit colonnes sur les écrans très larges
                gap-4 // Espacement entre les éléments
                mt-4 // Marge supérieure
            "
        >
            {/* Mappe chaque élément du tableau de chansons à un composant SongItem */}
            {songs.map((item) => (
                <SongItem
                    // Utilise l'identifiant unique de chaque chanson comme clé
                    key={item.id}

                    // Passe la fonction de gestion de lecture à SongItem
                    onClick={(id) => onPlay(id)}

                    // Passe les données de chaque chanson au composant SongItem
                    data={item}
                />
            ))}
        </div>
    );
}

// Exportation du composant pour utilisation ailleurs dans l'application
export default PageContent;
