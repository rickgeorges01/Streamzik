// Importation des types pour définir les métadonnées
import type {Metadata} from "next";

// Importation de la police Figtree depuis Google Fonts via Next.js
import {Figtree} from "next/font/google";

// Importation des styles globaux
import "./globals.css";

// Importation des composants nécessaires
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import Player from "@/components/Player";

// Importation des fonctions pour récupérer les données des chansons et des produits
import getSongsByUserId from "@/actions/getSongsByUserId";
import getActiveProdcutsWithPrices from "@/actions/getActiveProdcutsWithPrices";

// Chargement de la police Figtree en spécifiant les sous-ensembles de caractères
const font = Figtree({subsets: ["latin"]});

// Configuration des métadonnées pour ce layout, utiles pour le SEO
export const metadata: Metadata = {
    title: "Streamzik",
    description: "Stream music",
};

// Configuration pour ne pas mettre en cache la page
export const revalidate = 0;

// Fonction asynchrone `RootLayout` qui représente le layout principal
export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    // Appel asynchrone pour obtenir les chansons de l'utilisateur
    const userSongs = await getSongsByUserId();

    // Appel asynchrone pour obtenir les produits actifs avec leurs prix
    const products = await getActiveProdcutsWithPrices();
    return (
        <html lang="en">
        {/* Utilisation du corps de la page avec une classe de police personnalisée */}
        <body className={font.className}>
        {/* Fournit des notifications toast */}
        <ToasterProvider/>
        {/* Fournit un contexte pour Supabase */}
        <SupabaseProvider>
            {/* Fournit un contexte utilisateur */}
            <UserProvider>
                {/* Fournit un contexte pour les modals et les produits  */}
                <ModalProvider products={products}/>
                {/* Affiche la barre latérale avec les chansons de l'utilisateur */}
                <Sidebar songs={userSongs}>
                    {children}
                </Sidebar>
                {/* Lecteur de musique */}
                <Player/>
            </UserProvider>
        </SupabaseProvider>

        </body>
        </html>
    );
}
