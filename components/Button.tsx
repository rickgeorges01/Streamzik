// Importation de `forwardRef` de React pour la transmission de référence d'un composant parent.
import {forwardRef} from "react";
import {twMerge} from "tailwind-merge";

// Extension des attributs standards d'un bouton HTML pour notre interface de props.
interface  ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

// Création du composant `Button` qui est enveloppé par `forwardRef` pour accéder à la `ref` de l'élément bouton.
const Button = forwardRef<HTMLButtonElement,ButtonProps>(({
    className,
    children,
    disabled,
    type = "button",
    ...props
}, ref) =>{

    // Rendu de l'élément `button` avec les props et la `ref` appliquées.
    return (
        <button
            type={type}
            className={twMerge(`
                w-full
                rounded-full
                bg-green-500
                border-transparent
                px-3
                py-3
                disabled:cursor-not-allowed
                disabled:opacity-50
                text-black
                font-bold
                hover:opacity-75
                transition 
            `,
                className)}
            disabled={disabled}
            ref={ref}
            {...props}
        >
            {children}
        </button>
    )
})
// Définition du nom d'affichage pour faciliter le débogage.
Button.displayName = "Button"

export default Button;
