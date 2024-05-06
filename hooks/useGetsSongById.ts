/**
 * `useGetsSongById` est un hook personnalisé qui récupère une chanson en fonction de son identifiant.
 * - `useState` initialise `isLoading` pour indiquer l'état du chargement et `song` pour stocker la chanson récupérée.
 * - `useSessionContext` fournit l'accès au client Supabase.
 * - `useEffect` gère la récupération de la chanson lorsque l'identifiant change.
 * - `useMemo` optimise le retour du hook en mémorisant les valeurs `isLoading` et `song`.
 * Ce hook est utilisé pour obtenir les détails d'une chanson à partir de la base de données Supabase.
 */

// Importation des hooks et types nécessaires
import { useEffect, useMemo, useState } from "react";
import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

// Définition du hook `useGetsSongById`
const useGetsSongById = (id?: string) => {
    // Initialisation des états `isLoading` et `song`
    const [isLoading, setIsLoading] = useState(false); // Indique si la récupération est en cours
    const [song, setSong] = useState<Song | undefined>(undefined); // Stocke la chanson récupérée

    // Obtient le client Supabase de la session en cours
    const { supabaseClient } = useSessionContext();

    // Utilise `useEffect` pour récupérer la chanson lorsque `id` change
    useEffect(() => {
        // Vérifie si l'identifiant est défini
        if (!id) return;

        // Indique que la récupération est en cours
        setIsLoading(true);

        // Fonction asynchrone pour récupérer la chanson par son identifiant
        const fetchSong = async () => {
            // Utilise le client Supabase pour récupérer la chanson par ID
            const { data, error } = await supabaseClient
                .from('songs') // Accède à la table `songs`
                .select('*') // Sélectionne toutes les colonnes
                .eq('id', id) // Filtre par identifiant
                .single(); // Récupère une seule ligne

            // Gère les erreurs de récupération de la chanson
            if (error) {
                setIsLoading(false); // Arrête le chargement
                toast.error(error.message); // Affiche un message d'erreur
                return;
            }

            // Met à jour `song` avec la chanson récupérée
            setSong(data as Song);

            // Indique que la récupération est terminée
            setIsLoading(false);
        };

        // Appelle `fetchSong` pour récupérer la chanson
        fetchSong();
        // Réexécute la récupération lorsque `id` ou `supabaseClient` change
    }, [id, supabaseClient]);

    // Utilise `useMemo` pour optimiser les performances
    return useMemo(() => ({
        // Retourne l'état `isLoading` et `song`
        isLoading,
        song
        // Recalcule seulement lorsque `isLoading` ou `song` change
    }), [isLoading, song]);
};

// Exportation du hook pour utilisation ailleurs dans l'application
export default useGetsSongById;
