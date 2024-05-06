// Indique que ce composant doit s'exécuter côté client
"use client"

// Importation des modules nécessaires
import Modal from "@/components/Modal"; // Composant Modal pour afficher le formulaire
import uniqid from "uniqid"; // Génère des identifiants uniques
import useUploadModal from "@/hooks/useUploadModal"; // Hook personnalisé pour gérer l'état de la modale
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"; // Pour la gestion des formulaires
import { useState } from "react";
import Input from "@/components/Input"; // Composant Input pour le formulaire
import Button from "@/components/Button"; // Composant Button pour le formulaire
import toast from "react-hot-toast"; // Affiche des notifications toast
import { useUser } from "@/hooks/useUser"; // Hook pour obtenir les détails de l'utilisateur
import { useSupabaseClient } from "@supabase/auth-helpers-react"; // Fournit le client Supabase
import { useRouter } from "next/navigation"; // Permet de rafraîchir la page après la soumission

// Composant UploadModal pour gérer l'ajout de chansons
const UploadModal = () => {
    // Gère l'état de chargement pour afficher ou masquer les éléments de la modale pendant les opérations asynchrones
    const [isLoading, setIsLoading] = useState(false);

    // Utilise le hook personnalisé pour accéder aux détails de l'utilisateur
    const { user } = useUser();

    // Utilise le routeur Next.js pour rafraîchir la page
    const router = useRouter();

    // Crée un client Supabase pour les requêtes
    const supabaseClient = useSupabaseClient();

    // Utilise le hook personnalisé pour gérer l'état du modal de téléchargement
    const uploadModal = useUploadModal();

    // Initialise les fonctions de gestion du formulaire
    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            // Valeurs par défaut du formulaire
            author: '',
            title: '',
            song: null,
            image: null,
        }
    });

    // Fonction de soumission du formulaire
    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            // Démarre le chargement
            setIsLoading(true);

            // Récupère les fichiers de chanson et d'image
            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            // Vérifie la présence des fichiers et de l'utilisateur
            if (!imageFile || !songFile || !user) {
                toast.error('Missing fields');
                return;
            }

            // Génère un identifiant unique
            const uniqueID = uniqid();

            // Télécharge le fichier de chanson dans le stockage Supabase
            const {
                data: songData,
                error: songError,
            } = await supabaseClient.storage.from('songs')
                .upload(`song-${values.title}-${uniqueID}`, songFile, {
                    cacheControl: '3600',
                    upsert: false
                });

            // Gère les erreurs lors du téléchargement de la chanson
            if (songError) {
                setIsLoading(false);
                return toast.error('Failed song upload');
            }

            // Télécharge le fichier image dans le stockage Supabase
            const {
                data: imageData,
                error: imageError,
            } = await supabaseClient.storage.from('images')
                .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                    cacheControl: '3600',
                    upsert: false
                });

            // Gère les erreurs lors du téléchargement de l'image
            if (imageError) {
                setIsLoading(false);
                return toast.error('Failed image upload');
            }

            // Insère les données de la chanson dans la base de données Supabase
            const {
                error: supabaseError,
            } = await supabaseClient.from('songs')
                .insert({
                    user_id: user.id,
                    title: values.title,
                    author: values.author,
                    image_path: imageData.path,
                    song_path: songData.path
                });

            // Gère les erreurs lors de l'insertion des données
            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            // Rafraîchit la page
            router.refresh();
            setIsLoading(false);
            toast.success('Song created successfully');
            reset(); // Réinitialise le formulaire
            uploadModal.onClose(); // Ferme la modale

        } catch (err) {
            toast.error("Something went wrong!")
        } finally {
            setIsLoading(true);
        }
    }

    // Gère la fermeture de la modale
    const onChange = (open: boolean) => {
        if (!open) {
            reset(); // Réinitialise le formulaire
            uploadModal.onClose(); // Ferme la modale
        }
    }

    // Rendu du composant
    return (
        <Modal
            title="Add a song" // Titre de la modale
            description="Upload an MP3 Files..." // Description de la modale
            isOpen={uploadModal.isOpen} // Indique si la modale est ouverte
            onChange={onChange} // Gère la fermeture de la modale
        >
            <form
                onSubmit={handleSubmit(onSubmit)} // Gère la soumission du formulaire
                className="flex flex-col gap-y-4"
            >
                {/* Champ d'entrée pour le titre de la chanson */}
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register('title', { required: true })}
                    placeholder="Song Title"
                />

                {/* Champ d'entrée pour l'auteur de la chanson */}
                <Input
                    id="author"
                    disabled={isLoading}
                    {...register('author', { required: true })}
                    placeholder="Song Author"
                />

                <div>
                    <div className="pb-1">Select a song file</div>
                    {/* Champ d'entrée pour le fichier MP3 */}
                    <Input
                        id="song"
                        type="file"
                        disabled={isLoading}
                        accept=".mp3"
                        {...register('song', { required: true })}
                    />
                </div>

                <div>
                    <div className="pb-1">Select an image</div>
                    {/* Champ d'entrée pour le fichier image */}
                    <Input
                        id="image"
                        type="file"
                        disabled={isLoading}
                        accept="image/*"
                        {...register('image', { required: true })}
                    />
                </div>

                {/* Bouton pour soumettre le formulaire */}
                <Button disabled={isLoading} type="submit">
                    Create
                </Button>
            </form>
        </Modal>
    );
}

// Exportation du composant
export default UploadModal;
