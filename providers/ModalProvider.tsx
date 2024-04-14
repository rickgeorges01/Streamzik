"use client"
import {Fragment, useEffect, useState} from "react";

import Modal from "@/components/Modal";

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
            <Modal/>
        </Fragment>
    );
}
export default ModalProvider;
