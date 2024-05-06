// "use client" : Directive indiquant que ce composant s'exécute côté client
"use client";

// Importation du composant Toaster de la bibliothèque react-hot-toast
import { Toaster } from "react-hot-toast";

// Composant ToasterProvider pour gérer les notifications toast
const ToasterProvider = () => {
    // Rendu du composant Toaster
    return (
        <Toaster
            // Personnalisation des options de style des notifications toast
            toastOptions={{
                style: {
                    background: '#333', // Couleur de fond des notifications
                    color: '#fff' // Couleur du texte des notifications
                }
            }}
        />
    );
}

// Exportation du composant pour l'utiliser ailleurs dans l'application
export default ToasterProvider;
