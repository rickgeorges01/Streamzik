// Importation des composants de la bibliothèque Radix pour les fenêtres modales
import * as Dialog from "@radix-ui/react-dialog";
// Importation de l'icône de fermeture de la modale
import { IoMdClose } from "react-icons/io";

// Interface des propriétés du composant Modal
interface ModalProps {
    isOpen: boolean; // Indique si la modale est ouverte
    onChange: (open: boolean) => void; // Fonction de gestion du changement d'état
    title: string; // Titre de la modale
    description: string; // Description de la modale
    children: React.ReactNode; // Contenu de la modale
}

// Composant Modal pour afficher une fenêtre modale
const Modal: React.FC<ModalProps> = ({
                                         isOpen,
                                         onChange,
                                         title,
                                         description,
                                         children
                                     }) => {
    return (
        // Conteneur racine de la modale
        <Dialog.Root
            open={isOpen} // Contrôle l'état ouvert/fermé de la modale
            defaultOpen={isOpen} // État initial de la modale
            onOpenChange={onChange} // Fonction pour gérer l'ouverture/la fermeture de la modale
        >
            {/* Portail pour rendre la modale en dehors de la hiérarchie du composant */}
            <Dialog.Portal>
                {/* Overlay sombre pour le fond */}
                <Dialog.Overlay
                    className="
                        bg-neutral-900/90 // Couleur de fond avec transparence
                        backdrop-blur-sm // Flou d'arrière-plan
                        fixed // Positionnement fixe
                        inset-0 // S'étend sur toute la fenêtre
                    "
                />
                {/* Contenu de la modale */}
                <Dialog.Content
                    className="
                        fixed // Positionnement fixe pour un placement précis
                        drop-shadow-md // Ombre portée
                        border // Bordure autour de la modale
                        border-neutral-700 // Couleur de la bordure
                        top-[50%] // Centre verticalement
                        left-[50%] // Centre horizontalement
                        max-h-full // Hauteur maximale
                        md:h-auto // Hauteur auto pour les écrans moyens et plus grands
                        max-h-[85vh] // Limite la hauteur à 85% de la vue
                        w-full // Occupe toute la largeur de l'écran
                        md:w-[50vw] // Largeur de la fenêtre standard (50% de l'écran)
                        translate-x-[-50%] // Centrage horizontal
                        translate-y-[-50%] // Centrage vertical
                        rounded-md // Bords arrondis
                        bg-neutral-800 // Couleur de fond
                        p-[25px] // Padding intérieur
                        focus:outline-none // Retire la bordure de focus par défaut
                    "
                >
                    {/* Titre de la modale */}
                    <Dialog.Title
                        className="
                            text-xl // Taille du texte
                            text-center // Centrer le texte
                            font-bold // Police en gras
                            mb-4 // Marge inférieure
                        "
                    >
                        {title}
                    </Dialog.Title>
                    {/* Description de la modale */}
                    <Dialog.Description
                        className="
                            mb-5 // Marge inférieure
                            text-sm // Petite taille de texte
                            leading-normal // Hauteur de ligne normale
                            text-center // Centrer le texte
                        "
                    >
                        {description}
                    </Dialog.Description>
                    {/* Contenu de la modale */}
                    {children}
                    {/* Bouton de fermeture */}
                    <Dialog.Close asChild>
                        <button
                            className="
                                text-neutral-400 // Couleur de texte
                                hover:text-white // Texte blanc au survol
                                absolute // Positionnement absolu
                                top-[10px] // Décalé du haut
                                right-[10px] // Décalé de la droite
                                inline-flex // Alignement des éléments en ligne
                                h-[25px] // Hauteur du bouton
                                w-[25px] // Largeur du bouton
                                appearance-none // Retire l'apparence par défaut
                                items-center // Alignement vertical au centre
                                justify-center // Alignement horizontal au centre
                                rounded-full // Bords arrondis
                                focus:outline-none // Retire la bordure de focus par défaut
                            "
                        >
                            {/* Icône de fermeture */}
                            <IoMdClose />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

// Exportation du composant pour utilisation dans d'autres parties de l'application
export default Modal;
