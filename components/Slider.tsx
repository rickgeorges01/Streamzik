/**
 * `Slider` est un composant de curseur utilisé pour ajuster une valeur numérique, tel que le volume.
 * - `RadixSlider.Root` est le conteneur principal du curseur.
 * - `RadixSlider.Track` représente la piste du curseur.
 * - `RadixSlider.Range` affiche la plage sélectionnée.
 * - `handleChange` appelle `onChange` lorsqu'une nouvelle valeur est sélectionnée.
 * Ce composant est utilisé pour offrir un contrôle intuitif des valeurs dans l'application, comme le volume.
 */

"use client"

// Importation des modules nécessaires
import * as RadixSlider from "@radix-ui/react-slider"; // Importation des composants Radix Slider

// Interface définissant les propriétés du composant `Slider`
interface SliderProps {
    value?: number; // Valeur actuelle du curseur
    onChange?: (value: number) => void; // Fonction appelée lorsque la valeur change
}

// Définition du composant `Slider`
const Slider: React.FC<SliderProps> = ({
                                           value = 1, // Valeur par défaut du curseur
                                           onChange
                                       }) => {
    // Fonction appelée lorsque la valeur du curseur change
    const handleChange = (newValue: number[]) => {
        onChange?.(newValue[0]); // Appelle `onChange` si défini, en passant la nouvelle valeur
    }

    // Rendu du composant `Slider`
    return (
        <RadixSlider.Root
            className="
                relative // Position relative pour le conteneur
                flex // Aligne les éléments horizontalement
                items-center // Centre verticalement
                select-none // Désactive la sélection de texte
                touch-none // Désactive le zoom tactile
                w-full // Largeur complète
                h-10 // Hauteur de 10 unités
            "
            defaultValue={[1]} // Valeur par défaut
            value={[value]} // Valeur actuelle
            onValueChange={handleChange} // Appelle `handleChange` à chaque changement
            max={1} // Valeur maximale du curseur
            step={0.1} // Incrément de changement
            aria-label="Volume" // Etiquette ARIA pour l'accessibilité
        >
            {/* Piste du curseur */}
            <RadixSlider.Track
                className="
                    bg-neutral-600 // Couleur de fond neutre
                    relative // Position relative pour la piste
                    grow // S'étend pour occuper l'espace disponible
                    rounded-full // Coins arrondis
                    h-[3px] // Hauteur de 3 pixels
                "
            >
                {/* Plage sélectionnée */}
                <RadixSlider.Range
                    className="
                        absolute // Position absolue pour la plage
                        bg-white // Couleur de fond blanche
                        rounded-full // Coins arrondis
                        h-full // Hauteur complète
                    "
                />
            </RadixSlider.Track>
        </RadixSlider.Root>
    );
}

// Exportation du composant pour utilisation ailleurs dans l'application
export default Slider;
