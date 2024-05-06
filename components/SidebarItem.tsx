// Importation du type IconType depuis "react-icons", utilisé pour typer l'icône
import { IconType } from "react-icons";

// Importation du composant Link de Next.js pour créer des liens entre les pages
import Link from "next/link";

// Importation de la fonction twMerge depuis le package "tailwind-merge"
// Elle sert à combiner intelligemment plusieurs classes Tailwind CSS
import { twMerge } from "tailwind-merge";

// Déclaration de l'interface SidebarItemProps
// Elle spécifie la structure des props acceptées par le composant SidebarItem
interface SidebarItemProps {
    // Type de l'icône provenant de "react-icons"
    icon: IconType;
    // Texte affiché à côté de l'icône
    label: string;
    // Indique si l'élément est actif (optionnel)
    active?: boolean;
    // URL cible du lien
    href: string;
}

// Déclaration du composant SidebarItem
// Il prend des props typées par l'interface SidebarItemProps
const SidebarItem: React.FC<SidebarItemProps> = ({
                                                     // Renommage de l'icône pour une utilisation directe
                                                     icon: Icon,
                                                     label,
                                                     active,
                                                     href
                                                 }) => {
    return (
        // Utilisation du composant Link de Next.js
        // La prop `href` contient l'URL cible du lien
        <Link
            href={href}
            // Utilisation de la fonction twMerge pour combiner les classes CSS
            className={twMerge(`
                flex  // Définit un conteneur flex
                flex-row // Les enfants sont arrangés en ligne
                h-auto // Hauteur automatique
                items-center // Aligne les enfants verticalement au centre
                w-full // Largeur du conteneur occupe toute la largeur parent
                gap-x-4 // Espace horizontal entre les enfants
                text-md // Taille de police moyenne
                font-medium // Police avec un poids moyen
                cursor-pointer // Change le curseur au survol
                hover:text-white // Change la couleur du texte au survol
                transition // Transition pour les changements d'état
                text-neutral-400 // Couleur de texte neutre
                py-1 // Ajoute du padding vertical
            `,
                active && "text-white" // Si l'élément est actif, la couleur du texte est blanche
            )}
        >
            {/* Rendu de l'icône avec une taille de 26 */}
            <Icon size={26} />
            {/* Rendu du texte du label */}
            <p className="truncate w-full">{label}</p>
        </Link>
    );
}

// Exportation du composant pour l'utiliser dans d'autres fichiers
export default SidebarItem;
