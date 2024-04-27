
import { useEffect, useState } from "react";

// Définition du hook useDebounce qui prend un type générique T en entrée et retourne une valeur de ce même type
function useDebounce<T>(value: T, delay?: number): T {
    // Déclaration d'un état local debouncedValue à l'aide du hook useState, initialisé avec la valeur passée en paramètre
    const [debouncedValue, setDebounceValue] = useState<T>(value);

    // Utilisation du hook useEffect pour effectuer des opérations de débordement de la valeur
    useEffect(() => {
        // Configuration d'un délai avant la mise à jour de la valeur débordée
        const timer = setTimeout(() => {
            // Mise à jour de la valeur débordée avec la valeur actuelle
            setDebounceValue(value);
            // Utilisation du délai spécifié ou d'une valeur par défaut de 500 ms
        }, delay || 500);

        // Nettoyage du délai à chaque changement de la valeur ou du délai
        return () => {
            // Annulation du délai pour éviter les déclenchements multiples
            clearTimeout(timer);
        };
        // Déclenchement du hook useEffect à chaque changement de la valeur ou du délai
    }, [value, delay]);

    // Retour de la valeur débordée
    return debouncedValue;
}


export default useDebounce;
