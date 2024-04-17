"use client"

import Modal from "@/components/Modal";
import {useSessionContext, useSupabaseClient} from "@supabase/auth-helpers-react";
import {useRouter} from "next/navigation";
import {Auth} from "@supabase/auth-ui-react";
import {ThemeSupa} from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import {useEffect} from "react";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const {session} = useSessionContext();
    const {onClose,isOpen} = useAuthModal();

    // Effet secondaire pour rafraîchir la page lorsque la session utilisateur change
    useEffect(() =>{
        if (session) {
            router.refresh();
            onClose();
        }
    },[session,router,onClose])

    // Fonction de gestion du changement d'état du modal
    const onChange = (open: boolean) => {
        if(!open){
            onClose();
        }
    }
    return (
        <Modal
            isOpen={isOpen}
            onChange={onChange}
            title="Welcome Back"
            description="Login to your account"
        >

            <Auth
                theme="dark"
                magicLink
                providers={["github"]}
                supabaseClient={supabaseClient}
                appearance = {{
                    theme : ThemeSupa,
                    variables : {
                        default : {
                           colors : {
                               brand:'#404040',
                               brandAccent:'#22c55e'
                           }
                        }
                    }
                }}
            />

        </Modal>
    );
}
export default AuthModal;
