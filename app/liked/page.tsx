/**
 * `Liked` est un composant qui affiche une page dédiée aux chansons aimées par l'utilisateur.
 * Il utilise le composant `Header` pour afficher un en-tête, puis affiche les chansons aimées.
 * - `getLikedSongs` récupère les chansons aimées depuis Supabase.
 * - `Header` affiche un titre et une image pour les chansons aimées.
 * - `LikedContent` rend les chansons aimées sous forme de liste interactive.
 * Cette page est utilisée pour donner un aperçu des chansons que l'utilisateur aime.
 */

import getLikedSongs from "@/actions/getLikedSongs"; // Fonction pour récupérer les chansons aimées
import Header from "@/components/Header"; // Composant pour afficher l'en-tête
import Image from "next/image"; // Composant Next.js pour afficher des images
import LikedContent from "@/app/liked/components/LikedContent"; // Composant pour afficher le contenu des chansons aimées
export const revalidate = 0; // Désactive la mise en cache

// Fonction asynchrone `Liked` pour la page des chansons aimées
const Liked = async () => {
    // Récupération des chansons aimées via l'action `getLikedSongs`
    const songs = await getLikedSongs();

    // Rendu de la page
    return (
        <div
            className="
                bg-neutral-900 // Couleur de fond
                rounded-lg // Bords arrondis
                h-full // Occupe toute la hauteur
                w-full // Occupe toute la largeur
                overflow-hidden // Coupe les débordements
                overflow-y-auto // Active le défilement vertical
            "
        >
            <Header>
                {/* Contenu du Header */}
                <div className="mt-20">
                    <div
                        className="
                            flex // Alignement horizontal
                            flex-col // Les éléments s'empilent verticalement
                            md:flex-row // Change l'alignement pour les écrans moyens
                            items-center // Centre les éléments horizontalement
                            gap-x-5 // Espacement horizontal entre les éléments
                        "
                    >
                        {/* Affichage de l'image des chansons aimées */}
                        <div
                            className="
                                relative // Pour positionner l'image avec `fill`
                                h-32 // Hauteur de l'image
                                w-32 // Largeur de l'image
                                lg:h-44 // Hauteur pour les écrans larges
                                lg:w-44 // Largeur pour les écrans larges
                            "
                        >
                            <Image
                                fill // Remplit le conteneur
                                alt="Playlists" // Texte alternatif de l'image
                                className="object-cover" // Couvre le conteneur avec l'image
                                src="/images/liked.png" // Source de l'image
                            />
                        </div>
                        <div
                            className="
                                flex // Alignement vertical
                                flex-col // Les éléments s'empilent verticalement
                                gap-y-2 // Espacement vertical entre les éléments
                                mt-4 // Marge supérieure
                                md:mt-0 // Supprime la marge pour les écrans moyens
                            "
                        >
                            {/* Affichage de la description de la playlist */}
                            <p className="hidden md:block font-semibold text-sm">
                                Playlist
                            </p>
                            {/* Affichage du titre des chansons aimées */}
                            <h1
                                className="
                                    text-white // Texte blanc
                                    text-4xl // Texte de grande taille
                                    sm:text-5xl // Texte plus grand pour les petits écrans
                                    lg:text-7xl // Texte encore plus grand pour les grands écrans
                                    font-bold // Texte en gras
                                "
                            >
                                Liked Songs
                            </h1>
                        </div>
                    </div>
                </div>
            </Header>
            {/* Affichage du contenu des chansons aimées */}
            <LikedContent songs={songs}/>
        </div>
    );
}

// Exportation du composant pour utilisation ailleurs dans l'application
export default Liked;
