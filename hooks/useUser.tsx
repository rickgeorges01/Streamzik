import {User} from "@supabase/auth-helpers-nextjs";
import {createContext, useContext, useEffect, useState} from "react";
import {Subscription, UserDetails} from "@/types";
import {useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";

//Définition du type de contexte utilisateur
type UserContextType = {
    accessToken: string | null;
    userDetails : UserDetails | null;
    isLoading : boolean;
    subscription : Subscription | null;
}

//Création du contexte utilisateur
export const UserContext = createContext <UserContextType | undefined>(
    undefined
);

//Définition des props pour le fournisseur de contexte
export interface Props {
    // Un index signature pour autoriser n'importe quelle prop supplémentaire.
    [propName: string]:any;
}

//Fournisseur de contexte utilisateur personnalisé
export const MyUserContextProvider = (props: Props) => {
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase
    } = useSessionContext();
    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null)

    // Définition de fonctions pour récupérer les données de l'utilisateur et de son abonnement depuis Supabase.
    const getUserDetails = ()=> supabase.from('users').select('*').single();
    const getSubscription = ()=>
        supabase
            .from('subscriptions')
            .select('*, prices(*,products(*))')
            .in('status', ['trialing','active'])
            .single();

    // Utilisation de useEffect pour charger les données de l'utilisateur et de l'abonnement dès que possible.
    useEffect(()=> {
        // Vérifie si un utilisateur est connecté et si les données ne sont pas déjà en cours de chargement ou chargées.
        if (user && !isLoadingData && !userDetails && !subscription) {
            setIsLoadingData(true);
            Promise.allSettled([getUserDetails(),getSubscription()]).then(
                (results)=>{
                    const userDetailsPromise = results[0];
                    const subscriptionPromise = results[1];

                    // Met à jour l'état avec les données reçues si la promesse est résolue avec succès.
                    if (userDetailsPromise.status ==="fulfilled") {
                        setUserDetails(userDetailsPromise.value.data as UserDetails)
                    }
                    if (subscriptionPromise.status ==="fulfilled") {
                        setSubscription(subscriptionPromise.value.data as Subscription)
                    }

                    setIsLoadingData(false);
                }
            )
        } else if (!user && !isLoadingUser && !isLoadingData) {
            // Réinitialise les données de l'utilisateur et de l'abonnement si aucun utilisateur n'est connecté.
            setUserDetails(null)
            setSubscription(null)
        }
    }, [user, isLoadingUser]);

    // Préparation de l'objet value pour fournir les données à travers le contexte.
    const value = {
        accessToken,
        user,
        userDetails,
        isLoading : isLoadingUser || isLoadingData,
        subscription
    };

    // Fournit le contexte aux composants enfants, permettant un accès global aux données de l'utilisateur.
    return <UserContext.Provider value={value} {...props}/>
};

export const useUser = () => {
    // Utilise le hook `useContext` pour accéder au contexte d'utilisateur fourni par `UserContext`.
    const context = useContext (UserContext);
    if (context === undefined) {
        throw new Error ('useUser must be used within a MyUserContextProvider');
    }
    return context;
}
