/**
 * `useDebounce` est un hook personnalisé conçu pour retarder la mise à jour d'une valeur,
 * ce qui permet de réduire le nombre de déclenchements dus aux changements de cette valeur.
 * - `useEffect` déclenche une mise à jour différée de la valeur après un délai spécifié.
 * - `clearTimeout` annule la mise à jour différée précédente si la valeur change avant la fin du délai.
 * Utilisé principalement pour les champs de saisie où des requêtes inutiles doivent être évitées
 * en attendant un délai après le dernier changement, tel que la recherche en temps réel.
 */

// Importation des hooks React pour gérer l'état et les effets
import { useEffect, useState } from "react";

// Définition du hook `useDebounce` qui prend un type générique T en entrée et retourne une valeur de ce même type
function useDebounce<T>(value: T, delay?: number): T {
    // Déclaration d'un état local `debouncedValue` à l'aide du hook `useState`, initialisé avec la valeur passée en paramètre
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    // Utilisation du hook `useEffect` pour effectuer des opérations liées au délai
    useEffect(() => {
        // Configuration d'un délai avant la mise à jour de la valeur différée
        const timer = setTimeout(() => {
            // Mise à jour de la valeur différée avec la valeur actuelle
            setDebouncedValue(value);
            // Utilisation du délai spécifié ou d'une valeur par défaut de 500 ms
        }, delay || 500);

        // Nettoyage du délai à chaque changement de la valeur ou du délai
        return () => {
            // Annulation du délai pour éviter les déclenchements multiples
            clearTimeout(timer);
        };
        // Déclenchement du hook `useEffect` à chaque changement de la valeur ou du délai.
    }, [value, delay]);

    // Retourne la valeur différée
    return debouncedValue;
}

// Exportation du hook pour utilisation dans d'autres parties de l'application
export default useDebounce;
