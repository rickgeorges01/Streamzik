"use client"
import Modal from "@/components/Modal";
import uniqid from "uniqid";
import useUploadModal from "@/hooks/useUploadModal";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {useState} from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import toast from "react-hot-toast";
import {useUser} from "@/hooks/useUser";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {useRouter} from "next/navigation";

const UploadModal = () => {
    // État pour gérer le chargement
    const [isLoading,setIsLoading] = useState(false);
    // Utilisation du hook pour récupérer l'utilisateur
    const {user} = useUser();
    // Utilisation du router de Next.js
    const router = useRouter();
    // Utilisation du client Supabase
    const supabaseClient = useSupabaseClient();
    // Utilisation du hook pour la modal
    const uploadModal = useUploadModal();

    // Initialisation des fonctions de gestion du formulaire avec react-hook-form
    const {
        register,
        handleSubmit,
        reset
    } =
        // Utilisation du hook useForm pour gérer le formulaire
        useForm<FieldValues>({
        defaultValues:{
            // Valeurs par défaut des champs du formulaire
            author:'',
            title:'',
            song:null,
            image:null,
        }
    })

    // Fonction appelée lors de la soumission du formulaire
    const onSubmit:SubmitHandler<FieldValues> = async (values) => {
        try{
            setIsLoading(true);

            // Récupération des fichiers de chanson et d'image à partir des valeurs soumises
            const imageFile=values.image?.[0];
            const songFile=values.song?.[0];

            // Vérification de la présence des fichiers et de l'utilisateur
            if(!imageFile || !songFile || !user ){
                // Affichage d'une erreur si des champs sont manquants
                toast.error('Missing fields');
                return;
            }
            // Génération d'un identifiant unique
            const uniqueID = uniqid();

            //Téléchargement du fichier de chanson vers le stockage Supabase
            const {
                data:songData,
                error:songError,
            } = await supabaseClient.storage.from('songs')
                .upload(`song-${values.title}-${uniqueID}`,songFile,{
                    cacheControl:'3600',
                    upsert:false
                })
            // Gestion des erreurs lors du téléchargement de la chanson
            if (songError){
                setIsLoading(false);
                return toast.error('Failed song upload');
            }

            // Téléchargement du fichier image vers le stockage Supabase
            const {
                data:imageData,
                error:imageError,
            } = await supabaseClient.storage.from('images')
                .upload(`image-${values.title}-${uniqueID}`,imageFile,{
                    cacheControl:'3600',
                    upsert:false
                })
            // Gestion des erreurs lors du téléchargement de l'image
            if (imageError){
                setIsLoading(false);
                return toast.error('Failed image upload');
            }
            // Insertion des données de la chanson dans la base de données Supabase
            const {
                error: supabaseError,
            } = await supabaseClient.from('songs')
                .insert({
                    user_id :user.id,
                    title:values.title,
                    author:values.author,
                    image_path:imageData.path,
                    song_path: songData.path
                });
            // Gestion des erreurs lors de l'insertion des données dans la base de données
            if (supabaseError){
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            // Actualisation de la page
            router.refresh();
            setIsLoading(false);
            toast.success('song created successfully');
            // Réinitialisation du formulaire
            reset();

            uploadModal.onClose();

        } catch (err) {
            toast.error("Something went wrong!")
        }finally {
            setIsLoading(true)
        }

    }
    // Fonction appelée lors du changement d'état de la modal
    const onChange = (open:boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    }

    return (
        <Modal
            title="Add a song"
            description="Upload an MP3 Files..."
            // Propriété indiquant si la modal est ouverte ou non
            isOpen= {uploadModal.isOpen}
            // Fonction appelée lors du changement d'état de la modal
            onChange={onChange}
        >
            <form
                // Soumission du formulaire à la fonction onSubmit
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4"
            >
                <Input
                    id="title"
                    disabled={isLoading}
                    // Enregistrement du champ 'title' avec validation
                    {...register('title', {required: true})}
                    placeholder="Song Title"
                />
                <Input
                    id="author"
                    disabled={isLoading}
                    // Enregistrement du champ 'author' avec validation
                    {...register('author', {required: true})}
                    placeholder="Song author"
                />
                <div>
                    <div className="pb-1">
                        Select a song file
                    </div>
                    <Input
                        id="song"
                        type="file"
                        disabled={isLoading}
                        accept=".mp3"
                        // Enregistrement du champ 'song' avec validation
                        {...register('song', {required: true})}
                    />
                </div>
                <div>
                    <div className="pb-1">
                        Select an image
                    </div>
                    <Input
                        id="image"
                        type="file"
                        disabled={isLoading}
                        accept="image/*"
                        // Enregistrement du champ 'image' avec validation
                        {...register('image', {required: true})}
                    />
                </div>
                <Button disabled={isLoading} type="submit">
                    Create
                </Button>
            </form>
        </Modal>
    );
}
export default UploadModal;
