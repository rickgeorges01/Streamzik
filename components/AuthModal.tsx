// "use client" : Directive indiquant que le composant s'exécute côté client
"use client";

// Importation des modules nécessaires
import Modal from "@/components/Modal"; // Composant Modal pour afficher la modale
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react"; // Hooks pour la session utilisateur et le client Supabase
import { useRouter } from "next/navigation"; // Hook pour gérer la navigation
import { Auth } from "@supabase/auth-ui-react"; // Composant Auth pour gérer l'authentification
import { ThemeSupa } from "@supabase/auth-ui-shared"; // Thème pour personnaliser le composant Auth
import useAuthModal from "@/hooks/useAuthModal"; // Hook personnalisé pour gérer l'état du modal d'authentification
import { useEffect } from "react"; // Hook pour gérer les effets secondaires

// Composant AuthModal pour gérer l'affichage du modal d'authentification
const AuthModal = () => {
    // Initialise le client Supabase pour les opérations d'authentification
    const supabaseClient = useSupabaseClient();

    // Initialise le router pour naviguer entre les pages
    const router = useRouter();

    // Récupère la session utilisateur en cours
    const { session } = useSessionContext();

    // Récupère les méthodes pour gérer l'état du modal d'authentification
    const { onClose, isOpen } = useAuthModal();

    // Utilise useEffect pour effectuer une action après un changement de session
    useEffect(() => {
        // Si une session utilisateur existe
        if (session) {
            router.refresh(); // Rafraîchit la page
            onClose(); // Ferme la fenêtre modale
        }
    }, [session, router, onClose]); // Dépendances du useEffect pour réagir à leurs changements

    // Gère le changement d'état de la modale
    const onChange = (open: boolean) => {
        // Si la modale est fermée
        if (!open) {
            onClose(); // Ferme la modale
        }
    };

    // Rendu du composant AuthModal
    return (
        // Utilise le composant Modal pour afficher le contenu
        <Modal
            isOpen={isOpen} // Indique si la modale doit être affichée
            onChange={onChange} // Gère le changement d'état de la modale
            title="Welcome Back" // Titre de la modale
            description="Login to your account" // Description de la modale
        >
            {/* Composant Auth pour gérer l'authentification */}
            <Auth
                theme="dark" // Définit le thème sombre pour le composant Auth
                magicLink // Permet l'authentification par lien magique
                providers={["github"]} // Fournit un fournisseur d'authentification GitHub
                supabaseClient={supabaseClient} // Fournit le client Supabase pour l'authentification
                appearance={{
                    theme: ThemeSupa, // Thème pour personnaliser l'apparence
                    variables: {
                        default: {
                            colors: {
                                brand: '#404040', // Couleur de la marque
                                brandAccent: '#22c55e' // Couleur d'accentuation
                            }
                        }
                    }
                }}
            />
        </Modal>
    );
}

// Exportation du composant pour l'utiliser ailleurs dans l'application
export default AuthModal;
