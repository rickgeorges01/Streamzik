// La directive "use client" assure que ce composant s'exécute uniquement dans le navigateur,
// exploitant la fonctionnalité des composants exclusivement clients de Next.js 13.
"use client";

// Importation des icônes de bibliothèque React pour afficher les icônes
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import {Song} from "@/types";
import MediaItem from "@/components/MediaItem";


interface LibraryProps {
    songs : Song[];
}
// Définition du composant Library
const Library : React.FC<LibraryProps> = ({
    songs
                                          }) => {
    // Utilisation du hook useAuthModal pour la gestion de la modal d'authentification
    const authModal = useAuthModal();
    // Utilisation du hook useUploadModal pour la gestion de la modal de téléchargement
    const uploadModal = useUploadModal();
    // Utilisation du hook useUser pour récupérer l'utilisateur actuel
    const { user } = useUser();

    // Fonction appelée lors du clic sur le bouton d'ajout
    const onClick = () => {
        if (!user) {
            // Si l'utilisateur n'est pas connecté, ouvrir la modal d'authentification
            return authModal.onOpen();
        }
        // Si l'utilisateur est connecté, vérifier les abonnements et ouvrir la modal de téléchargement
        //ToDo:check for subscriptions
        return uploadModal.onOpen();
    };

    // Rendu du composant Library
    return (
        <div className="flex flex-col">
            {/* En-tête de la bibliothèque avec l'icône de playlist et le titre */}
            <div className="
                flex
                items-center
                justify-between
                px-5
                pt-4"
            >
                <div className="
                    inline-flex
                    items-center
                    gap-x-2
                ">
                    {/* Icône de playlist */}
                    <TbPlaylist className="text-neutral-400" size={26}/>
                    {/* Titre de la bibliothèque */}
                    <p
                        className="
                            text-neutral-400
                            font-medium
                            text-md
                        "
                    >
                        Your Library
                    </p>
                </div>
                {/* Bouton d'ajout */}
                <AiOutlinePlus
                    onClick={onClick}
                    size={26}
                    className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-white
                        transition
                    "
                />
            </div>
            {/* Contenu de la bibliothèque (listes de chansons) */}
            <div
                className="
                    flex
                    flex-col
                    gap-y-2
                    mt-4
                    px-3
                "
            >
                {songs.map((item)=>(
                    <MediaItem
                        onClick={()=>{}}
                        key={item.id}
                        data={item}
                    />
                ))}
            </div>
        </div>
    );
}


export default Library;
