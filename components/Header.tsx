"use client";

// Importation des bibliothèques nécessaires pour la navigation, la gestion des icônes, et les notifications toast
import { useRouter } from "next/navigation"; // Hook pour gérer la navigation dans Next.js
import { twMerge } from "tailwind-merge"; // Fusionne les classes Tailwind intelligemment
import { RxCaretLeft, RxCaretRight } from "react-icons/rx"; // Icônes pour la navigation
import { HiHome, HiSearch } from "react-icons/hi"; // Icônes pour les boutons de navigation mobile
import { Fragment } from "react"; // Fragment pour grouper des éléments JSX sans ajouter un élément HTML
import Button from "@/components/Button"; // Composant personnalisé pour les boutons
import useAuthModal from "@/hooks/useAuthModal"; // Hook personnalisé pour ouvrir les fenêtres modales d'authentification
import { useSupabaseClient } from "@supabase/auth-helpers-react"; // Gère l'interaction avec Supabase
import { useUser } from "@/hooks/useUser"; // Hook personnalisé pour obtenir l'utilisateur actuel
import { FaUserAlt } from "react-icons/fa"; // Icône pour le profil utilisateur
import toast from "react-hot-toast"; // Affiche les notifications toast
import usePlayer from "@/hooks/usePlayer"; // Hook personnalisé pour contrôler le lecteur de musique

// Interface définissant les propriétés du composant Header
interface HeaderProps {
    children: React.ReactNode; // Le contenu à afficher à l'intérieur du Header
    className?: string; // Classe CSS optionnelle pour personnaliser le style
}

// Composant principal pour le Header
const Header: React.FC<HeaderProps> = ({ children, className }) => {
    // Gère l'ouverture de la fenêtre modale d'authentification
    const authModal = useAuthModal();

    // Gère la navigation entre les pages
    const router = useRouter();

    // Fournit un client Supabase pour l'authentification et les interactions avec la base de données
    const supabaseClient = useSupabaseClient();

    // Récupère les informations sur l'utilisateur actuellement connecté
    const { user } = useUser();

    // Contrôle les fonctionnalités du lecteur de musique
    const player = usePlayer();

    // Fonction pour déconnecter l'utilisateur en utilisant Supabase
    const handleLogout = async () => {
        // Demande à Supabase de déconnecter l'utilisateur
        const { error } = await supabaseClient.auth.signOut();
        // Réinitialise l'état du lecteur audio
        player.reset();
        // Rafraîchit la page pour appliquer les changements
        router.refresh();
        // Affiche une notification toast en cas d'erreur ou de succès
        if (error) {
            // Affiche un message d'erreur si la déconnexion échoue
            toast.error(error.message);
        } else {
            // Affiche un message de succès si la déconnexion réussit
            toast.success('Logged out successfully!');
        }
    }

    return (
        // Conteneur principal du Header avec des classes Tailwind pour un dégradé
        <div className={twMerge(`
            h-fit
            bg-gradient-to-b // Dégradé du haut vers le bas
            from-emerald-800 // Couleur de départ du dégradé (violet)
            via-purple-200 // Couleur intermédiaire du dégradé (rouge)
            to-gray-400 // Couleur de fin du dégradé (jaune)
            p-6 // Padding intérieur de 1.5rem
        `,
            className
        )}>
            {/* Conteneur des boutons de navigation et des options utilisateur */}
            <div className="
                w-full
                mb-4
                flex
                items-center
                justify-between
            ">
                {/* Boutons de navigation précédent/suivant pour les écrans moyens et grands */}
                <div className="
                    hidden // Masqué sur les petits écrans
                    md:flex // Affiché sur les écrans moyens et plus grands
                    gap-x-2 // Espace horizontal entre les boutons
                    items-center
                ">
                    {/* Bouton pour naviguer vers la page précédente */}
                    <button
                        // Action pour revenir en arrière
                        onClick={() => router.back()}
                        className="
                            rounded-full // Bouton circulaire
                            bg-black // Couleur de fond noire
                            flex // Conteneur flex
                            items-center // Alignement vertical au centre
                            justify-center // Alignement horizontal au centre
                            hover:opacity-75 // Opacité réduite au survol
                            transition // Transition douce entre les états
                        ">
                        {/* Icône de flèche gauche */}
                        <RxCaretLeft className="text-white" size={35} />
                    </button>

                    {/* Bouton pour naviguer vers la page suivante */}
                    <button
                        // Action pour avancer
                        onClick={() => router.forward()}
                        className="
                            rounded-full // Bouton circulaire
                            bg-black // Couleur de fond noire
                            flex // Conteneur flex
                            items-center // Alignement vertical au centre
                            justify-center // Alignement horizontal au centre
                            hover:opacity-75 // Opacité réduite au survol
                            transition // Transition douce entre les états
                        ">
                        {/* Icône de flèche droite */}
                        <RxCaretRight className="text-white" size={35} />
                    </button>
                </div>

                {/* Boutons de navigation Home/Search pour les petits écrans */}
                <div className="
                    flex // Conteneur flex
                    md:hidden // Masqué sur les écrans moyens et grands
                    gap-x-2 // Espace horizontal entre les boutons
                    items-center // Alignement vertical au centre
                ">
                    {/* Bouton pour naviguer vers la page d'accueil */}
                    <button
                        className="
                            rounded-full // Bouton circulaire
                            p-2 // Padding intérieur de 0.5rem
                            bg-white // Couleur de fond blanche
                            flex // Conteneur flex
                            items-center // Alignement vertical au centre
                            jusitify-center // Alignement horizontal au centre
                            hover:opacity-75 // Opacité réduite au survol
                            transition // Transition douce entre les états
                        "
                    >
                        {/* Icône de maison */}
                        <HiHome className="text-black" size={20} />
                    </button>

                    {/* Bouton pour naviguer vers la page de recherche */}
                    <button
                        className="
                            rounded-full // Bouton circulaire
                            p-2 // Padding intérieur de 0.5rem
                            bg-white // Couleur de fond blanche
                            flex // Conteneur flex
                            items-center // Alignement vertical au centre
                            jusitify-center // Alignement horizontal au centre
                            hover:opacity-75 // Opacité réduite au survol
                            transition // Transition douce entre les états
                        "
                    >
                        {/* Icône de loupe */}
                        <HiSearch className="text-black" size={20} />
                    </button>
                </div>

                {/* Boutons d'authentification et de profil */}
                <div className="
                    flex // Conteneur flex
                    justify-between // Espacement maximal entre les éléments
                    items-center // Alignement vertical au centre
                    gap-x-4 // Espace horizontal entre les boutons
                ">
                    {user ? (
                        // Si l'utilisateur est connecté, affiche les boutons de déconnexion et de profil
                        <div className="flex gap-x-4 items-center">
                            <Button
                                // Action pour déconnecter l'utilisateur
                                onClick={handleLogout}
                                className="bg-white px-6 py-2"
                            >
                                Logout
                            </Button>
                            <Button
                                // Action pour accéder au profil
                                onClick={() => router.push('/account')}
                                className="bg-white"
                            >
                                {/* Icône du profil utilisateur */}
                                <FaUserAlt />
                            </Button>
                        </div>
                    ) : (
                        // Si l'utilisateur n'est pas connecté, affiche les boutons de connexion/inscription
                        <Fragment>
                            <div>
                                <Button
                                    // Action pour ouvrir la fenêtre modale d'authentification
                                    onClick={authModal.onOpen}
                                    className="
                                        bg-transparent // Fond transparent
                                        text-neutral-300 // Texte gris
                                        font-medium // Police de poids moyen
                                    "
                                >
                                    Sign Up
                                </Button>
                            </div>
                            <div>
                                <Button
                                    // Action pour ouvrir la fenêtre modale d'authentification
                                    onClick={authModal.onOpen}
                                    className="
                                        bg-white // Couleur de fond blanche
                                        px-6 // Padding horizontal de 1.5rem
                                        py-2 // Padding vertical de 0.5rem
                                    "
                                >
                                    Log In
                                </Button>
                            </div>
                        </Fragment>
                    )}
                </div>
            </div>
            {/* Affichage du contenu fourni */}
            {children}
        </div>
    );
}

export default Header;
