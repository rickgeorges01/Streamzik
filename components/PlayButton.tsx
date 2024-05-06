// "use client" : Directive indiquant que ce composant s'exécute côté client
"use client";

// Importation de l'icône FaPlay de react-icons
import { FaPlay } from "react-icons/fa";

// Composant PlayButton pour afficher un bouton de lecture
const PlayButton = () => {
    // Rendu du bouton de lecture
    return (
        <button
            className="
                transition // Transition CSS pour les animations
                opacity-0 // Initialement invisible
                rounded-full // Forme arrondie du bouton
                flex // Utilisation de flexbox pour centrer le contenu
                items-center // Aligne verticalement les éléments
                bg-green-500 // Couleur de fond verte
                p-4 // Espacement intérieur
                drop-shadow-md // Ombre portée du bouton
                translate // Classe d'animation pour le mouvement
                translate-y-1/4 // Positionne le bouton en bas au départ
                group-hover:opacity-100 // Règle l'opacité à 100% lorsque l'élément parent est survolé
                group-hover:translate-y-0 // Ramène le bouton à sa position initiale lors du survol
                hover:scale-110 // Agrandit le bouton au survol
            "
        >
            {/* Icône de lecture FaPlay */}
            <FaPlay className="text-black" />
        </button>
    );
}

// Exportation du composant pour utilisation ailleurs dans l'application
export default PlayButton;
