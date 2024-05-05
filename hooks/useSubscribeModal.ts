import {create} from "zustand"

// Définit une interface TypeScript décrivant la forme de l'état géré par ce store
interface SubscribeModalStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}
// Utilise la fonction 'create' de Zustand pour créer un hook personnalisé 'useAuthModal'
const useSubscribeModal = create<SubscribeModalStore>((set)=>({
    // Initialise la propriété 'isOpen' à 'false', indiquant que le modal est fermé initialement
    isOpen: false,
    // Définit la fonction 'onOpen' qui ouvre le modal en mettant à jour l'état avec 'isOpen' à 'true'
    onOpen: () => set({isOpen:true}),
    // Définit la fonction 'onClose' qui ferme le modal en mettant à jour l'état avec 'isOpen' à 'false'
    onClose: () => set({isOpen:false})
}));

export default useSubscribeModal;
