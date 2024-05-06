/**
 * `LikedContent` est un composant React qui affiche une liste des chansons aimées par l'utilisateur.
 * Il assure également que l'utilisateur est authentifié avant d'afficher les données.
 * - `useEffect` redirige vers la page d'accueil si l'utilisateur n'est pas authentifié.
 * - Affiche un message si aucune chanson n'est aimée ou rend une liste d'éléments `MediaItem` sinon.
 * Utilisé pour afficher et gérer les chansons aimées par l'utilisateur.
 */

"use client"

// Importation des types et composants nécessaires
import { Song } from "@/types"; // Type représentant une chanson
import { useRouter } from "next/navigation"; // Hook pour naviguer dans l'application
import { useUser } from "@/hooks/useUser"; // Hook pour accéder aux informations utilisateur
import { useEffect } from "react";
import MediaItem from "@/components/MediaItem"; // Composant pour afficher les détails d'une chanson
import LikeButton from "@/components/LikeButton"; // Composant pour aimer ou retirer une chanson des favoris
import useOnPlay from "@/hooks/useOnPlay"; // Hook pour gérer la lecture d'une chanson

// Définition des propriétés attendues par le composant `LikedContent`
interface LikedContentProps {
    songs: Song[]; // Tableau de chansons aimées
}

// Définition du composant `LikedContent`
const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
    const router = useRouter(); // Utilisé pour rediriger vers une autre page
    const { isLoading, user } = useUser(); // Obtenir l'utilisateur authentifié et l'état de chargement
    const onPlay = useOnPlay(songs); // Hook pour gérer la lecture des chansons

    // Utilisation de `useEffect` pour vérifier l'authentification
    useEffect(() => {
        // Si l'utilisateur n'est pas authentifié et que le chargement est terminé, redirige vers la page d'accueil
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    // Affiche un message si aucune chanson n'est aimée
    if (songs.length === 0) {
        return (
            <div
                className="
                    flex // Alignement vertical
                    flex-col // Les éléments s'empilent verticalement
                    gap-y-2 // Espacement vertical entre les éléments
                    w-full // Occupe toute la largeur
                    px-6 // Padding horizontal
                    text-neutral-400 // Texte grisé
                "
            >
                No liked songs! {/* Message affiché */}
            </div>
        );
    }

    // Rendu du composant `LikedContent`
    return (
        <div
            className="flex flex-col gap-y-2 w-full p-6"
        >
            {/* Mappe chaque élément du tableau de chansons à un composant MediaItem */}
            {songs.map((song) => (
                <div
                    key={song.id} // Utilise l'identifiant unique de chaque chanson comme clé
                    className="flex items-center gap-x-4 w-full"
                >
                    {/* Affichage du composant MediaItem */}
                    <div className="flex-1">
                        <MediaItem
                            onClick={(id: string) => onPlay(id)}
                            data={song}
                        />
                    </div>

                    {/* Affichage du bouton LikeButton */}
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
    );
}

// Exportation du composant pour utilisation ailleurs dans l'application
export default LikedContent;
