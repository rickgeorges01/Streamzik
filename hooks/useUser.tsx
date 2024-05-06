/**
 * `useUser` est un hook personnalisé qui fournit des informations sur l'utilisateur authentifié,
 * ses détails et son abonnement, tout en assurant une gestion centralisée du contexte utilisateur.
 * - `MyUserContextProvider` encapsule le contexte utilisateur, offrant un état global aux composants enfants.
 * - `useUser` accède au contexte utilisateur pour obtenir les détails pertinents et l'état de chargement.
 * Ce hook est utilisé pour rendre les données de l'utilisateur accessibles dans toute l'application,
 * permettant un accès facile aux détails de l'utilisateur et aux informations d'abonnement.
 */

// Importation des types `User` de Supabase, des hooks React, et des types personnalisés
import { User } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useState } from "react";
import { Subscription, UserDetails } from "@/types";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";

// Définition du type de contexte utilisateur
// Structure les données utilisateur partagées dans l'application
type UserContextType = {
    accessToken: string | null; // Jeton d'accès de l'utilisateur
    user: User | null; // Objet utilisateur de Supabase
    userDetails: UserDetails | null; // Détails supplémentaires de l'utilisateur
    isLoading: boolean; // Indique si les données sont en cours de chargement
    subscription: Subscription | null; // Information d'abonnement
}

// Création du contexte utilisateur
// Fournit un contexte initial indéfini
export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

// Définition des propriétés du fournisseur de contexte
export interface Props {
    [propName: string]: any; // Accepte des propriétés supplémentaires
}

// Fournisseur de contexte utilisateur personnalisé
// Fournisseur personnalisé pour gérer les informations utilisateur dans l'application
export const MyUserContextProvider = (props: Props) => {
    // Extraction de la session, de l'état de chargement utilisateur, et du client Supabase depuis le contexte de session
    const {
        session, // Session de l'utilisateur actuellement connecté
        isLoading: isLoadingUser, // État de chargement lié aux données utilisateur
        supabaseClient: supabase // Instance du client Supabase pour les requêtes à la base de données
    } = useSessionContext();

    // Récupère l'utilisateur depuis le contexte de Supabase
    const user = useSupaUser();

    // Obtient le jeton d'accès depuis la session, sinon retourne null
    const accessToken = session?.access_token ?? null;

    // États pour gérer le chargement et le stockage des données utilisateur
    const [isLoadingData, setIsLoadingData] = useState(false); // Indique si les données supplémentaires sont en cours de chargement
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null); // Détails supplémentaires de l'utilisateur
    const [subscription, setSubscription] = useState<Subscription | null>(null); // Informations d'abonnement de l'utilisateur

    // Fonction pour récupérer les détails de l'utilisateur à partir de la table 'users'
    const getUserDetails = () => supabase.from('users').select('*').single();

    // Fonction pour récupérer les informations d'abonnement à partir de la table 'subscriptions'
    const getSubscription = () =>
        supabase
            .from('subscriptions')
            // Joint les détails de prix et de produits
            .select('*, prices(*,products(*))')
            // Filtre les abonnements actifs ou en essai
            .in('status', ['trialing', 'active'])
            // Retourne un seul enregistrement
            .single();

    // Hook effect pour charger les données utilisateur et abonnement à l'initialisation ou lors de changements pertinents
    useEffect(() => {
        // Vérifie que l'utilisateur est connecté et que les données ne sont pas déjà en cours de chargement
        if (user && !isLoadingData && !userDetails && !subscription) {
            setIsLoadingData(true); // Démarre le chargement des données
            // Charge les données utilisateur et abonnement de manière asynchrone
            Promise.allSettled([getUserDetails(), getSubscription()]).then(
                (results) => {
                    // Vérifie les résultats des promesses pour mettre à jour les états
                    const userDetailsPromise = results[0];
                    const subscriptionPromise = results[1];

                    // Met à jour les détails utilisateur si chargés avec succès
                    if (userDetailsPromise.status === "fulfilled") {
                        setUserDetails(userDetailsPromise.value.data as UserDetails);
                    }
                    // Met à jour les détails d'abonnement si chargés avec succès
                    if (subscriptionPromise.status === "fulfilled") {
                        setSubscription(subscriptionPromise.value.data as Subscription);
                    }

                    setIsLoadingData(false); // Fin du chargement des données
                }
            );
        } else if (!user && !isLoadingUser && !isLoadingData) {
            // Réinitialise les données utilisateur et abonnement si l'utilisateur se déconnecte
            setUserDetails(null);
            setSubscription(null);
        }
        // Exécute à chaque changement des dépendances
    }, [user, isLoadingUser]);

    // Prépare les données du contexte pour les composants enfants
    const value = {
        accessToken, // Jeton d'accès pour les requêtes authentifiées
        user, // Objet utilisateur de Supabase
        userDetails, // Détails supplémentaires de l'utilisateur
        isLoading: isLoadingUser || isLoadingData, // Indique si les données sont en cours de chargement
        subscription // Détails d'abonnement
    };

    // Fournit le contexte aux composants enfants
    return <UserContext.Provider value={value} {...props} />;
};

// Hook personnalisé pour accéder au contexte utilisateur
export const useUser = () => {
    const context = useContext(UserContext); // Récupère le contexte
    if (context === undefined) {
        throw new Error('useUser must be used within a MyUserContextProvider');
    }
    return context; // Retourne les données du contexte
}
