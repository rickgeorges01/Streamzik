// "use client" : Directive indiquant que ce composant s'exécute côté client
"use client"

// Importation du module `query-string` pour manipuler les requêtes URL
import qs from "query-string";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import Input from "@/components/Input";

// Définition du composant SearchInput
const SearchInput = () => {
    // Utilisation du hook useRouter pour obtenir l'objet router
    const router = useRouter();

    // Déclaration d'un état local `value` pour stocker la valeur du champ de saisie
    const [value, setValue] = useState<string>("");

    // Utilisation du hook useDebounce pour retarder les mises à jour de la valeur du champ de saisie
    const debouncedValue = useDebounce<string>(value, 500);

    // Utilisation du hook useEffect pour effectuer des actions lorsque la valeur différée change
    useEffect(() => {
        // Construction de l'objet de requête à partir de la valeur différée du champ de saisie
        const query = {
            title: debouncedValue,
        };

        // Construction de l'URL avec la nouvelle requête à l'aide de query-string
        const url = qs.stringifyUrl({
            url: '/search', // L'URL de destination est '/search'
            query: query // La requête contient le titre différé du champ de saisie
        });

        // Navigation vers la nouvelle URL construite
        router.push(url);

        // Le hook useEffect est déclenché à chaque changement de la valeur différée ou de l'objet router
    }, [debouncedValue, router]);

    // Rendu du composant SearchInput
    return (
        <Input
            // Placeholde pour indiquer la fonction du champ
            placeholder="What do you want to listen to?"

            // Associe la valeur de l'état local au champ de saisie
            value={value}

            // Gestion de l'événement onChange pour mettre à jour la valeur du champ de saisie
            onChange={(e) => setValue(e.target.value)}
        />
    );
}

// Exportation du composant pour utilisation ailleurs dans l'application
export default SearchInput;
