// Importation de la fonction 'create' de la bibliothèque Zustand pour créer un store
import { create } from "zustand";

// Interface TypeScript définissant la structure de l'état du store
interface AuthModalStore {
    isOpen: boolean; // Indique si la fenêtre modale est ouverte ou fermée
    onOpen: () => void; // Fonction pour ouvrir la fenêtre modale
    onClose: () => void; // Fonction pour fermer la fenêtre modale
}

// Création d'un hook personnalisé `useAuthModal` avec Zustand
const useAuthModal = create<AuthModalStore>((set) => ({
    // Initialisation de l'état du store
    isOpen: false, // Initialise à 'false', indiquant que la fenêtre modale est fermée

    // Fonction pour ouvrir la fenêtre modale
    onOpen: () => set({ isOpen: true }),

    // Fonction pour fermer la fenêtre modale
    onClose: () => set({ isOpen: false })
}));

// Exportation du hook personnalisé pour utilisation dans d'autres parties de l'application
export default useAuthModal;
