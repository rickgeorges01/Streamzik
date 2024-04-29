
import {create} from "zustand";

// Définition de l'interface PlayerStore pour décrire la forme de l'état
interface PlayerStore {
    // Tableau d'identifiants de pistes audio
    ids: string[];
    // Identifiant de la piste audio active (optionnel)
    activeId?: string;
    // Méthode pour définir l'identifiant de la piste audio active
    setId: (id: string) => void;
    // Méthode pour définir les identifiants de toutes les pistes audio
    setIds: (ids: string[]) => void;
    // Méthode pour réinitialiser l'état du lecteur audio
    reset: () => void;
}

// Création du hook usePlayer en utilisant create de zustand
const usePlayer = create<PlayerStore>((set) => ({
    // Initialisation de l'état avec un tableau d'identifiants vide et aucun identifiant actif
    ids: [],
    activeId: undefined,
    // Définition des méthodes pour mettre à jour l'état
    setId: (id: string) => set({ activeId: id }), // Définit l'identifiant actif
    setIds: (ids: string[]) => set({ ids: ids }), // Définit tous les identifiants
    reset: () => set({ ids: [], activeId: undefined }) // Réinitialise l'état
}));

// Exportation du hook usePlayer pour une utilisation dans d'autres composants React
export default usePlayer;
