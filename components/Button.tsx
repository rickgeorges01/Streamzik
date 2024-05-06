

import { forwardRef } from "react";// Importation de `forwardRef` de React pour permettre aux composants parents de référencer directement le bouton
import { twMerge } from "tailwind-merge";// Importation de `twMerge` pour fusionner intelligemment les classes Tailwind CSS

// Définition de l'interface ButtonProps
// Elle étend les attributs HTML par défaut pour les boutons, ajoutant de la flexibilité
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

// Déclaration du composant `Button`
// `forwardRef` permet de transmettre une référence au bouton pour un accès direct
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
                                                               className, // Classe CSS optionnelle pour personnaliser le style du bouton
                                                               children, // Contenu du bouton (texte, icônes, etc.)
                                                               disabled, // Indique si le bouton est désactivé
                                                               type = "button", // Type du bouton, par défaut "button"
                                                               ...props // Autres attributs transmis au bouton
                                                           }, ref) => {
    // Retourne le bouton avec les propriétés et la référence appliquées
    return (
        <button
            type={type} // Type du bouton (par exemple, "submit", "button", etc.)
            className={twMerge(`
                w-full // Prend toute la largeur de son conteneur parent
                rounded-full // Bords arrondis pour un aspect circulaire
                bg-emerald-200 // Couleur de fond émeraude
                border-transparent // Pas de bordure visible
                px-3 // Padding horizontal de 0.75rem
                py-3 // Padding vertical de 0.75rem
                disabled:cursor-not-allowed // Curseur bloqué si le bouton est désactivé
                disabled:opacity-50 // Opacité réduite si le bouton est désactivé
                text-black // Couleur du texte noire
                font-bold // Texte en gras
                hover:opacity-75 // Opacité réduite au survol
                transition // Transition douce entre les états
            `,
                className)} // Fusionne les classes par défaut avec les classes personnalisées
            disabled={disabled} // Applique l'état désactivé si nécessaire
            ref={ref} // Référence au bouton
            {...props} // Autres attributs HTML transmis au bouton
        >
            {children} {/* Contenu du bouton */}
        </button>
    )
})

// Définition du nom d'affichage pour faciliter le débogage
Button.displayName = "Button";

// Exportation du composant pour l'utiliser ailleurs dans l'application
export default Button;
