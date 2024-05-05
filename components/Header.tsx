"use client"
import {useRouter} from "next/navigation";
import {twMerge} from "tailwind-merge";
import {RxCaretLeft, RxCaretRight} from "react-icons/rx";
import {HiHome, HiSearch} from "react-icons/hi";
import {Fragment} from "react";
import Button from "@/components/Button";
import useAuthModal from "@/hooks/useAuthModal";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {useUser} from "@/hooks/useUser";
import {FaUserAlt} from "react-icons/fa";
import toast from "react-hot-toast";
import usePlayer from "@/hooks/usePlayer";


interface HeaderProps  {
    children : React.ReactNode;
    className?: string;
}
const Header : React.FC<HeaderProps> = ({
        children,
        className
     }) => {
    // Initialisation du hook useAuthModal
    const authModal= useAuthModal();
    // Initialisation du hook useRouter pour gérer la navigation
    const router = useRouter();
    // Initialisation du hook useSupabaseClient pour interagir avec Supabase
    const supabaseClient = useSupabaseClient();
    // Récupération des informations de l'utilisateur connecté
    const {user} = useUser();
    const player = usePlayer();

    // Fonction pour gérer la déconnexion de l'utilisateur
    const handleLogout = async () => {
        const {error} = await supabaseClient.auth.signOut();
        player.reset();
        router.refresh()
        if(error){
            toast.error(error.message)
        } else {
            toast.success('Logged out successfully !')
        }
    }
    return (
        <div className={twMerge(`
            h-ft
            bg-gradient-to-b
            from-emerald-800
            p-6
        `,
            className
        )}>
            <div className="
                w-full
                mb-4
                flex
                items-center
                justify-between
            ">
                {/* Boutons de navigation (précédent et suivant) pour les appareils de taille moyenne et grande */}
                <div className="
                    hidden
                    md:flex
                    gap-x-2
                    items-center
                ">
                    <button
                        onClick={()=>router.back()}
                        className="
                            rounded-full
                            bg-black
                            flex
                            items-center
                            justify-center
                            hover:opacity-75
                            transition
                        ">
                        <RxCaretLeft className="text-white" size={35}/>
                    </button>

                    <button
                        onClick={()=>router.forward()}
                        className="
                            rounded-full
                            bg-black
                            flex
                            items-center
                            justify-center
                            hover:opacity-75
                            transition
                        ">
                        <RxCaretRight className="text-white" size={35}/>
                    </button>
                </div>

                <div className="
                    flex
                    md:hidden
                    gap-x-2
                    items-center
                ">
                    <button
                        className="
                            rounded-full
                            p-2
                            bg-white
                            flex
                            items-center
                            jusitify-center
                            hover:opacity-75
                            transition
                        "
                    >
                        <HiHome className="text-black" size={20}/>
                    </button>

                    <button
                        className="
                            rounded-full
                            p-2
                            bg-white
                            flex
                            items-center
                            jusitify-center
                            hover:opacity-75
                            transition
                        "
                    >
                        <HiSearch className="text-black" size={20}/>
                    </button>
                </div>

                {/* Affichage des boutons de connexion/déconnexion et du profil utilisateur */}
                <div className="
                    flex
                    justify-between
                    items-center
                    gap-x-4
                ">
                    {user ? (
                        // Si l'utilisateur est connecté
                        <div className="flex gap-x-4 items-center">
                            <Button
                                onClick={handleLogout}
                                className="bg-white px-6 py-2"
                            >
                                Logout
                            </Button>
                            <Button
                                onClick={() =>router.push('/account')}
                                className="bg-white"
                            >
                                <FaUserAlt/>
                            </Button>
                        </div>
                    ) : (
                        // Si l'utilisateur n'est pas connecté
                        <Fragment>
                            <div>
                                <Button
                                    onClick={authModal.onOpen}
                                    className="
                                        bg-transparent
                                        text-neutral-300
                                        font-medium
                                    "
                                >
                                    Sign Up
                                </Button>
                            </div>
                            <div>
                                <Button
                                    onClick={authModal.onOpen}
                                    className="
                                        bg-white
                                        px-6
                                        py-2
                                    "
                                >
                                    Log In
                                </Button>
                            </div>
                        </Fragment>
                    )}
                </div>

            </div>
            {children}
        </div>
    );
}
export default Header;
