"use client";

// Importation des modules nécessaires pour la gestion des modals et des hooks React
import { Fragment, useEffect, useState } from "react";

// Importation des composants de modal personnalisés
import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import SubscribeModal from "@/components/SubscribeModal";

// Importation du type `ProductWithPrice` pour définir la structure des produits avec des prix
import { ProductWithPrice } from "@/types";

// Interface pour les propriétés du fournisseur de modal
interface ModalProviderProps {
    products: ProductWithPrice[]; // Liste des produits avec leurs prix pour SubscribeModal
}

// Composant `ModalProvider` pour gérer l'affichage des différentes modals
const ModalProvider: React.FC<ModalProviderProps> = ({ products }) => {
    // État pour suivre si le composant est monté
    const [isMounted, setIsMounted] = useState(false);

    // Hook `useEffect` pour mettre à jour l'état `isMounted` après le rendu initial
    useEffect(() => {
        // Met à jour l'état `isMounted` à `true` une fois que le composant est monté
        setIsMounted(true);
        // Le tableau vide signifie que cela ne s'exécute qu'une seule fois, après le premier rendu
    }, []);

    // Si le composant n'est pas encore complètement monté, retourne `null` pour ne pas afficher les modals
    if (!isMounted) {
        return null;
    }

    // Rendu des modals nécessaires dans l'application
    return (
        <Fragment>
            {/* Modal d'authentification */}
            <AuthModal />

            {/* Modal de téléchargement */}
            <UploadModal />

            {/* Modal d'abonnement, reçoit les produits en tant que prop */}
            <SubscribeModal products={products} />
        </Fragment>
    );
}

// Exportation du composant `ModalProvider` pour l'utiliser dans d'autres parties de l'application
export default ModalProvider;
