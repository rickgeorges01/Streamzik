import { Song } from "../types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Définition de la fonction getSongsByUserId qui retourne une promesse d'un tableau de chansons (Song[])
const getSongsByUserId = async (): Promise<Song[]> => {

    // En passant l'objet cookies en tant qu'option lors de la création du client Supabase
    const supabase = createServerComponentClient({
        // Les cookies sont utilisés pour l'authentification et d'autres fonctionnalités côté serveur
        cookies: cookies
    });

    // Récupération de la session utilisateur à partir du client Supabase
    const {
        // Données de session utilisateur
        data: sessionData,
        // Erreur éventuelle lors de la récupération de la session
        error: sessionError
    } = await supabase.auth.getSession();

    // Gestion des erreurs liées à la récupération de la session utilisateur
    if (sessionError){
        console.log(sessionError.message);
        // Retourne un tableau vide en cas d'erreur
        return [];
    }

    // Récupération des chansons associées à l'utilisateur actuellement connecté
    const {
        // Données des chansons récupérées
        data,
        // Erreur éventuelle lors de la récupération des chansons
        error
    } = await supabase.from('songs')
        .select('*')
        // Filtre pour récupérer les chansons de l'utilisateur actuel
        .eq('user_id', sessionData.session?.user.id)
        // Tri des chansons par date de création décroissante
        .order('created_at', {ascending: false});

    // Gestion des erreurs liées à la récupération des chansons
    if (error){
        console.log(error.message);
    }

    // Retourne les données des chansons récupérées ou un tableau vide si aucune donnée n'est disponible
    return (data as any) || [];
};


export default getSongsByUserId;
