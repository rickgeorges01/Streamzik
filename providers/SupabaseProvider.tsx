// "use client" : Directive de Next.js indiquant que ce composant doit être rendu côté client
"use client";

// Importation des modules nécessaires
import { Database } from "@/types_db"; // Types TypeScript pour la structure de la base de données
import { useState } from "react"; // Hook React pour gérer l'état local
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"; // Fonction pour créer un client Supabase
import { SessionContextProvider } from "@supabase/auth-helpers-react"; // Fournisseur de contexte pour gérer les sessions Supabase

// Interface définissant les propriétés acceptées par SupabaseProvider
interface SupabaseProviderProps {
    children: React.ReactNode; // Composants enfants qui seront enveloppés par ce fournisseur
}

// Composant SupabaseProvider pour fournir le client Supabase à l'application
const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
    // Création et initialisation d'un client Supabase
    const [supabaseClient] = useState(() =>
        // Initialise le client en le typant selon la structure de la base de données
        createClientComponentClient<Database>()
    );

    // Utilisation du fournisseur de contexte de session
    // Enveloppe les composants enfants avec le contexte Supabase pour leur donner accès au client
    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
            {children}
        </SessionContextProvider>
    );
}

// Exportation du composant pour une utilisation dans d'autres parties de l'application
export default SupabaseProvider;
