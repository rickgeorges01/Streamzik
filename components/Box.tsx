// Importation de twMerge, qui combine les classes Tailwind CSS
import { twMerge } from "tailwind-merge";

// Définition de l'interface des props du composant Box
// `children` : contenu à afficher à l'intérieur de la boîte
// `className` : classes CSS personnalisées optionnelles
interface BoxProps {
    children: React.ReactNode; // Contenu affiché dans la boîte
    className?: string; // Classes CSS additionnelles pour personnaliser le style
}

// Déclaration du composant fonctionnel Box
// Accepte des props typées par BoxProps
const Box: React.FC<BoxProps> = ({ children, className }) => {
    return (
        // Div englobante qui combine les classes par défaut et les classes personnalisées
        <div
            className={twMerge(`
                bg-neutral-900 // Couleur d'arrière-plan neutre
                rounded-lg // Coins arrondis
                h-fit // Hauteur ajustée au contenu
                w-full // Largeur totale du conteneur parent
            `,
                // Ajoute les classes personnalisées transmises par `className`
                className
            )}
        >
            {/* Rend le contenu fourni comme enfants */}
            {children}
        </div>
    );
}

// Exportation du composant Box pour l'utiliser dans d'autres fichiers
export default Box;
