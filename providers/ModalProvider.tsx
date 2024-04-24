"use client"
import {Fragment, useEffect, useState} from "react";

import Modal from "@/components/Modal";
import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    // Utilisation du hook useEffect pour effectuer une action après le rendu initial
    useEffect(()=>{
        // Mettre à jour l'état isMounted à true lorsque le composant est monté
        setIsMounted(true);
    },[]);

    // Si le composant n'est pas complètement monté, ne rien retourner (null)
    if (!isMounted) {
        return null;
    }

    return (
        <Fragment>
            <AuthModal/>
            <UploadModal/>
        </Fragment>
    );
}
export default ModalProvider;
