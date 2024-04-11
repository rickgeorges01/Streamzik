"use client"

import {Database} from "@/types_db";
import {useState} from "react";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {SessionContextProvider} from "@supabase/auth-helpers-react";

interface SupabaseProviderProps {
    children: React.ReactNode;
}
const SupabaseProvider : React.FC<SupabaseProviderProps> = ({
    children
}) =>{
    // Utilise le hook useState pour initialiser le client Supabase une seule fois lors du montage du composant.
    const [supabaseClient] = useState(()=>
        // Crée une instance du client Supabase typée selon la structure de la base de données.
        createClientComponentClient<Database>()
    );

    // Enveloppe les enfants avec le fournisseur de contexte de session Supabase.
    return(
        <SessionContextProvider supabaseClient={supabaseClient}>
           {children}
        </SessionContextProvider>
    )
}

export default SupabaseProvider;
