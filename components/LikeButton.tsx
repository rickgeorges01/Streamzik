/**
 * `LikeButton` est un composant permettant aux utilisateurs de marquer une chanson comme aimée ou de retirer cette marque.
 * Il utilise Supabase pour stocker les préférences des utilisateurs dans la base de données.
 * - `useEffect` vérifie au chargement si l'utilisateur a déjà aimé la chanson et met à jour l'état `isLiked`.
 * - `handleLike` gère les interactions utilisateur, ajoutant ou supprimant les chansons aimées.
 * Il permet aux utilisateurs de gérer facilement leur liste de favoris.
 */

"use client"

// Importation des modules et hooks nécessaires
import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import toast from "react-hot-toast";

// Interface définissant les propriétés attendues par le composant LikeButton
interface LikeButtonProps {
    songId: string; // L'ID de la chanson
}

// Définition du composant `LikeButton`
const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
    // Initialisation des hooks et des états
    const router = useRouter(); // Pour rafraîchir la page après avoir aimé ou supprimé
    const { supabaseClient } = useSessionContext(); // Pour accéder à Supabase
    const authModal = useAuthModal(); // Pour ouvrir le modal d'authentification si nécessaire
    const { user } = useUser(); // Pour obtenir les informations de l'utilisateur connecté
    const [isLiked, setIsLiked] = useState(false); // État pour savoir si la chanson est aimée

    // Utilisation de `useEffect` pour vérifier si la chanson est déjà aimée
    useEffect(() => {
        // Si l'utilisateur n'est pas connecté, on ne fait rien
        if (!user?.id) return;

        // Fonction asynchrone pour récupérer l'état actuel de la chanson
        const fetchData = async () => {
            const { data, error } = await supabaseClient
                .from('liked_songs') // Accède à la table `liked_songs`
                .select('*') // Sélectionne toutes les colonnes
                .eq('user_id', user.id) // Filtre par ID utilisateur
                .eq('song_id', songId) // Filtre par ID chanson
                .single(); // Récupère une seule ligne

            // Si aucune erreur n'est survenue et que des données sont retournées, la chanson est aimée
            if (!error && data) setIsLiked(true);
        };

        fetchData(); // Appel de la fonction pour charger l'état initial
    }, [songId, supabaseClient, user?.id]); // Dépendances pour recharger en cas de changement

    // Choisit l'icône à afficher en fonction de l'état `isLiked`
    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    // Fonction pour gérer le clic sur le bouton
    const handleLike = async () => {
        // Si l'utilisateur n'est pas connecté, on ouvre le modal d'authentification
        if (!user) return authModal.onOpen();

        // Si la chanson est déjà aimée, on la retire des `liked_songs`
        if (isLiked) {
            const { error } = await supabaseClient
                .from('liked_songs') // Accède à la table `liked_songs`
                .delete() // Supprime l'enregistrement
                .eq('user_id', user.id) // Filtre par ID utilisateur
                .eq('song_id', songId); // Filtre par ID chanson

            // Si une erreur survient, affiche un message d'erreur
            if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(false); // Met à jour l'état local
                toast.error('Your song has been unliked');
            }
        } else {
            // Sinon, ajoute la chanson à `liked_songs`
            const { error } = await supabaseClient
                .from('liked_songs') // Accède à la table `liked_songs`
                .insert({
                    song_id: songId, // ID de la chanson
                    user_id: user.id // ID de l'utilisateur
                });

            // Si une erreur survient, affiche un message d'erreur
            if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(true); // Met à jour l'état local
                toast.success('Liked successfully!');
            }
        }

        // Rafraîchit la page pour refléter les changements
        router.refresh();
    }

    // Rendu du bouton de like avec gestionnaire de clic
    return (
        <button
            onClick={handleLike}
            className="
                hover:opacity-75 // Réduit l'opacité au survol
                transition // Transition douce pour les changements d'état
            "
        >
            <Icon color={ isLiked ? '#22c55e' : 'white'} size={25}/>
        </button>
    );
}

// Exportation du composant pour utilisation ailleurs dans l'application
export default LikeButton;
