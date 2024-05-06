// "use client" indique que ce composant doit être exécuté côté client (navigateur)
"use client";

// Importation d'icônes depuis les bibliothèques React pour les utiliser dans l'interface utilisateur
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

// Importation des hooks personnalisés pour gérer les différentes fonctionnalités de l'application
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import useOnPlay from "@/hooks/useOnPlay";
import useSubscribeModal from "@/hooks/useSubscribeModal";

// Importation du type `Song` pour typer les données des chansons
import { Song } from "@/types";

// Importation du composant `MediaItem` pour afficher les éléments de la bibliothèque
import MediaItem from "@/components/MediaItem";

// Interface définissant les propriétés acceptées par le composant Library
interface LibraryProps {
    songs: Song[]; // Liste des chansons à afficher dans la bibliothèque
}

// Définition du composant `Library` pour afficher une liste de chansons
const Library: React.FC<LibraryProps> = ({ songs }) => {
    // Utilisation du hook `useSubscribeModal` pour gérer la fenêtre modale d'abonnement
    const subscribeModal = useSubscribeModal();

    // Utilisation du hook `useAuthModal` pour gérer la fenêtre modale d'authentification
    const authModal = useAuthModal();

    // Utilisation du hook `useUploadModal` pour gérer la fenêtre modale de téléchargement
    const uploadModal = useUploadModal();

    // Utilisation du hook `useUser` pour récupérer les informations de l'utilisateur connecté
    const { user, subscription } = useUser();

    // Utilisation du hook `useOnPlay` pour gérer la lecture d'une chanson
    const onPlay = useOnPlay(songs);

    // Fonction appelée lorsque l'utilisateur clique sur le bouton d'ajout
    const onClick = () => {
        if (!user) {
            // Si l'utilisateur n'est pas connecté, afficher la fenêtre modale d'authentification
            return authModal.onOpen();
        }

        if (!subscription) {
            // Si l'utilisateur n'a pas d'abonnement, afficher la fenêtre modale d'abonnement
            return subscribeModal.onOpen();
        }

        // Sinon, afficher la fenêtre modale de téléchargement
        return uploadModal.onOpen();
    };

    // Rendu du composant `Library`
    return (
        <div className="flex flex-col">
            {/* En-tête de la bibliothèque */}
            <div className="flex items-center justify-between px-5 pt-4">
                {/* Icône de playlist et titre */}
                <div className="inline-flex items-center gap-x-2">
                    {/* Icône de playlist */}
                    <TbPlaylist className="text-neutral-400" size={26} />
                    {/* Titre de la bibliothèque */}
                    <p className="text-neutral-400 font-medium text-md">
                        Your Library
                    </p>
                </div>

                {/* Bouton d'ajout */}
                <AiOutlinePlus
                    onClick={onClick} // Appelle `onClick` pour gérer les actions d'ajout
                    size={26} // Taille de l'icône
                    className="text-neutral-400 cursor-pointer hover:text-white transition" // Style du bouton
                />
            </div>

            {/* Contenu de la bibliothèque (listes de chansons) */}
            <div className="flex flex-col gap-y-2 mt-4 px-3">
                {songs.map((item) => (
                    // Rendu d'un élément `MediaItem` pour chaque chanson
                    <MediaItem
                        onClick={(id: string) => onPlay(id)} // Gestion de la lecture de la chanson
                        key={item.id} // Identifiant unique pour chaque élément
                        data={item} // Données de la chanson
                    />
                ))}
            </div>
        </div>
    );
};

// Exportation du composant pour l'utiliser dans d'autres parties de l'application
export default Library;
