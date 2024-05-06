// "use client" : Directive de Next.js indiquant que le composant doit s'exécuter côté client
"use client";

// Importation du fournisseur de contexte utilisateur personnalisé
import { MyUserContextProvider } from "@/hooks/useUser";
import { Children } from "react";

// Définition de l'interface des propriétés du composant UserProvider
interface UserProviderProps {
    children: React.ReactNode; // Composants enfants à envelopper dans le contexte utilisateur
}

// Déclaration du composant UserProvider
const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    // Enveloppe les composants enfants dans MyUserContextProvider pour fournir des données utilisateur
    return (
        <MyUserContextProvider>
            {children}
        </MyUserContextProvider>
    )
};

// Exportation du composant pour une utilisation dans d'autres parties de l'application
export default UserProvider;
