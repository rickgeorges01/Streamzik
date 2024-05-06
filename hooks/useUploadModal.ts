// Importation de la fonction `create` de la bibliothèque Zustand pour créer un store
import { create } from "zustand";

// Interface TypeScript définissant la structure du store
interface UploadModalStore {
    isOpen: boolean; // Indique si la fenêtre modale est ouverte ou fermée
    onOpen: () => void; // Fonction pour ouvrir la fenêtre modale
    onClose: () => void; // Fonction pour fermer la fenêtre modale
}

// Création du hook personnalisé `useUploadModal` avec Zustand
const useUploadModal = create<UploadModalStore>((set) => ({
    // Initialisation de l'état de la fenêtre modale à fermée
    isOpen: false,

    // Fonction pour ouvrir la fenêtre modale
    onOpen: () => set({ isOpen: true }),

    // Fonction pour fermer la fenêtre modale
    onClose: () => set({ isOpen: false })
}));

// Exportation du hook personnalisé pour être utilisé dans d'autres parties de l'application
export default useUploadModal;
