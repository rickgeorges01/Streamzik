// Importation de la fonction forwardRef de React pour créer un composant avec une ref
import { forwardRef } from "react";
// Importation de la fonction twMerge depuis le package "tailwind-merge" pour fusionner des classes Tailwind CSS
import { twMerge } from "tailwind-merge";

// Définition des propriétés attendues par le composant Input, qui hérite de toutes les propriétés des champs de saisie HTML
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// Définition du composant Input avec forwardRef pour permettre l'utilisation de ref
const Input = forwardRef<HTMLInputElement, InputProps>(({
// Classes CSS supplémentaires fournies par l'utilisateur
className,
// Type du champ de saisie (text, email, etc.)
type,
// Indique si le champ de saisie est désactivé ou non
disabled,
// Autres propriétés fournies au champ de saisie.
...props}, ref) => {
    return (
        <input
            // Type du champ de saisie
            type={type}
            // Classes CSS du champ de saisie, fusionnées avec les classes de base de Tailwind CSS
            className={twMerge(`
                flex
                w-full
                rounded-md
                bg-neutral-700
                border-transparent
                px-3
                py-3
                text-sm
                file:border-0
                file:font-medium
                placeholder:text-neutral-400
                disabled:cursor-not-allowed
                disabled:opacity-50
                focus:outline-none
            `,
                // Classes CSS fournies par l'utilisateur
                className
            )}
            // Indique si le champ de saisie est désactivé ou non
            disabled={disabled}
            // Référence pour accéder au DOM du champ de saisie
            ref={ref}
            // Autres propriétés fournies au champ de saisie
            {...props}
        />
    )
});

// Définition du nom d'affichage du composant Input
Input.displayName = "Input";

export default Input;
