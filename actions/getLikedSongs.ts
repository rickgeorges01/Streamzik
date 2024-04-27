// Importation de la classe Song depuis le fichier de définition de type (types.ts ?) dans le répertoire "@/types"
import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// Importation de l'objet cookies depuis le module "next/headers"
import { cookies } from "next/headers";

// Définition de la fonction getSongs qui retourne une promesse d'un tableau de chansons (Song[])
const getLikedSongs = async (): Promise<Song[]> => {

    // En passant l'objet cookies en tant qu'option lors de la création du client Supabase
    const supabase = createServerComponentClient({
        cookies: cookies // Les cookies sont utilisés pour l'authentification et d'autres fonctionnalités côté serveur
    });

    const {
        data:{
            session
        }
    } = await supabase.auth.getSession();

    // Récupération des données de la table 'songs' à partir de Supabase
    const { data, error } = await supabase
        .from('liked_songs')
        // Sélection de toutes les colonnes (*)
        .select('*, songs(*)')
        .eq('user_id', session?.user?.id)
        // Tri des résultats par ordre décroissant de la colonne 'created_at'
        .order('created_at', { ascending: false });

    // Gestion des erreurs, si une erreur survient lors de la récupération des données
    if (error) {
        // Affichage de l'erreur dans la console
        console.log(error);
        return [];
    }
    if(!data){
        return [];
    }

    return data.map((item)=>({
        ...item.songs
    }))
};

export default getLikedSongs;
