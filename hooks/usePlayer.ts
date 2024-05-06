/**
 * `usePlayer` est un hook Zustand personnalisé qui gère l'état du lecteur audio.
 * - `ids` représente le tableau des identifiants des pistes audio disponibles.
 * - `activeId` est l'identifiant de la piste audio actuellement en cours de lecture.
 * - `setId` met à jour l'identifiant de la piste active.
 * - `setIds` met à jour les identifiants de toutes les pistes disponibles.
 * - `reset` réinitialise l'état du lecteur audio.
 * Ce hook est utilisé pour gérer l'état et les actions du lecteur audio de l'application.
 */

// Importation de `create` depuis la bibliothèque Zustand pour créer le store
import {create} from "zustand";

// Interface décrivant la forme de l'état géré par `usePlayer`
interface PlayerStore {
    ids : string[]; // Tableau des identifiants des pistes audio
    activeId? : string; // Identifiant de la piste audio active (optionnel)
    setId : (id : string) => void; // Méthode pour définir l'identifiant de la piste active
    setIds : (ids : string[]) => void; // Méthode pour définir les identifiants de toutes les pistes
    reset : () => void; // Méthode pour réinitialiser l'état du lecteur audio
}

// Création du hook `usePlayer` en utilisant `create` de Zustand
const usePlayer = create<PlayerStore> ( (set) => ({
    // Initialisation de l'état
    ids : [], // Tableau vide pour les identifiants des pistes
    activeId : undefined, // Aucun identifiant actif par défaut
    // Méthode pour définir l'identifiant de la piste active
    setId : (id : string) => set ( {activeId : id} ),
    // Méthode pour définir les identifiants de toutes les pistes
    setIds : (ids : string[]) => set ( {ids : ids} ),
    // Méthode pour réinitialiser l'état du lecteur audio
    reset : () => set ( {ids : [], activeId : undefined} )
}) );

// Exportation du hook pour utilisation ailleurs dans l'application
export default usePlayer;

