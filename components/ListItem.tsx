/**
 * `ListItem` est un composant représentant un élément de liste avec une image, un nom, et un bouton de lecture.
 * - `useRouter` permet de naviguer vers une nouvelle page lorsque l'élément est cliqué.
 * - `Image` affiche l'image de l'élément.
 * - `FaPlay` représente l'icône de lecture.
 * Ce composant est utilisé pour offrir une interface utilisateur attrayante pour les éléments de la liste.
 */

"use client"

// Importation des modules nécessaires
import { useRouter } from "next/navigation"; // Hook pour naviguer dans l'application
import Image from "next/image"; // Composant Next.js pour afficher des images
import { FaPlay } from "react-icons/fa"; // Icône pour le bouton de lecture

// Interface définissant les propriétés du composant `ListItem`
interface ListItemProps {
    image: string; // URL de l'image à afficher
    name: string; // Nom de l'élément
    href: string; // URL de navigation lorsque l'élément est cliqué
}

// Définition du composant `ListItem`
const ListItem: React.FC<ListItemProps> = ({
                                               image,
                                               name,
                                               href
                                           }) => {
    const router = useRouter(); // Utilisé pour naviguer vers une nouvelle page
    // Fonction appelée lorsque l'élément est cliqué
    const onClick = () => {
        // Ajouter une logique d'authentification avant de naviguer (à implémenter)
        router.push(href); // Navigue vers l'URL spécifiée
    }

    // Rendu du composant `ListItem`
    return (
        <button
            onClick={onClick} // Appelle `onClick` lorsque le bouton est cliqué
            className="
                relative // Position relative pour le bouton
                group // Groupe d'éléments pour le survol
                flex // Aligne les éléments horizontalement
                items-center // Centre verticalement
                rounded-md // Coins arrondis
                overflow-hidden // Coupe les débordements
                gap-x-4 // Espacement horizontal entre les éléments
                bg-neutral-100/10 // Fond neutre transparent
                hover:bg-neutral-100/20 // Change le fond au survol
                transition // Transition douce pour les changements d'état
                pr-4 // Padding à droite
            "
        >
            <div
                className="
                    relative // Position relative pour l'image
                    min-h-[64px] // Hauteur minimale de 64 pixels
                    min-w-[64px] // Largeur minimale de 64 pixels
                "
            >
                {/* Affichage de l'image de l'élément */}
                <Image
                    className="object-cover" // L'image couvre le conteneur
                    fill // Remplit le conteneur
                    src={image} // URL de l'image
                    alt="Image" // Texte alternatif
                />
            </div>
            {/* Affichage du nom de l'élément */}
            <p className="font-medium truncate py-5">
                {name}
            </p>
            {/* Bouton de lecture */}
            <div
                className="
                    absolute // Position absolue pour le bouton de lecture
                    transition // Transition douce pour les changements d'état
                    opacity-0 // Initialement transparent
                    rounded-full // Bouton rond
                    flex // Aligne les éléments horizontalement
                    items-center // Centre verticalement
                    justify-center // Centre horizontalement
                    bg-green-500 // Fond vert
                    p-4 // Padding
                    drop-shadow-md // Ombre portée
                    right-5 // Positionné à droite
                    group-hover:opacity-100 // Devient opaque au survol
                    hover:scale-110 // S'agrandit au survol
                "
            >
                <FaPlay className="text-black"/> {/* Icône de lecture */}
            </div>
        </button>
    );
}

// Exportation du composant pour utilisation ailleurs dans l'application
export default ListItem;
