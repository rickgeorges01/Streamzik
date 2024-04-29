import { useEffect, useMemo, useState } from "react";
import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

const useGetsSongById = (id?: string) => {
    // Définit les états isLoading et song avec useState
    const [isLoading, setIsLoading] = useState(false); // État pour indiquer si la récupération est en cours
    const [song, setSong] = useState<Song | undefined>(undefined); // État pour stocker la chanson récupérée

    // Récupère le client supabase de la session en cours en utilisant useSessionContext
    const { supabaseClient } = useSessionContext();

    // Utilise useEffect pour effectuer la récupération de la chanson lorsqu'un nouvel identifiant est fourni
    useEffect(() => {
        // Vérifie si l'identifiant est défini
        if (!id) {
            return;
        }

        // Indique que la récupération est en cours
        setIsLoading(true);

        // Fonction asynchrone pour récupérer la chanson à partir de son identifiant
        const fetchSong = async () => {
            // Utilise le client supabase pour sélectionner une chanson à partir de son identifiant
            const { data, error } = await supabaseClient
                .from('songs')
                .select('*')
                .eq('id', id)
                .single();

            // Gère les erreurs de récupération de la chanson
            if (error) {
                setIsLoading(false); // Arrête le chargement
                toast.error(error.message); // Affiche un message d'erreur à l'utilisateur
            }

            // Met à jour l'état song avec la chanson récupérée
            setSong(data as Song);

            // Indique que la récupération est terminée
            setIsLoading(false);
        };

        // Appelle la fonction de récupération de la chanson
        fetchSong();
        // Effectue le chargement à chaque changement de l'identifiant ou du client supabase
    }, [id, supabaseClient]);

    // Utilise useMemo pour optimiser les performances en évitant de recréer l'objet à chaque rendu
    return useMemo(() => ({
        // Renvoie l'état isLoading
        isLoading,
        // Renvoie l'état song
        song
        // Recalcule seulement lorsque isLoading ou song change
    }), [isLoading, song]);
};

export default useGetsSongById;
