// Importation du composant Image de Next.js pour gérer les images
import Image from "next/image";
// Importation des composants Header et ListItem
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
// Importation de la fonction getSongs pour récupérer les chansons
import getSongs from "@/actions/getSongs";
// Importation du composant PageContent pour afficher les chansons
import PageContent from "@/app/(site)/components/PageContent";

// Configure la stratégie de mise en cache des pages statiques.
// Une valeur de 0 signifie que la page est toujours régénérée à chaque demande.
export const revalidate = 0;

// Fonction asynchrone `Home` pour la page d'accueil
export default async function Home() {
    // Récupération des chansons via l'action `getSongs`
    const songs = await getSongs();

    // Rendu de la page d'accueil
    return (
        <div
            className="
                bg-neutral-900 // Couleur de fond
                rounded-lg // Bords arrondis
                h-full // Occupe toute la hauteur
                overflow-hidden // Coupe les débordements
                overflow-y-auto // Active le défilement vertical
            "
        >
            <Header>
                {/* Contenu du Header */}
                <div className="mb-2">
                    <h1
                        className="
                            text-white // Texte blanc
                            text-3xl // Texte de grande taille
                            font-semibold // Texte en gras
                        "
                    >
                        Welcome back
                    </h1>

                    <div
                        className="
                            grid // Mise en page en grille
                            grid-cols-1 // Une seule colonne par défaut
                            sm:grid-cols-2 // Deux colonnes pour les petits écrans
                            xl:grid-cols-3 // Trois colonnes pour les grands écrans
                            2xl:grid-cols-4 // Quatre colonnes pour les très grands écrans
                            gap-3 // Espacement entre les éléments
                            mt-4 // Marge supérieure
                        "
                    >
                        {/* Élément ListItem représentant les chansons aimées */}
                        <ListItem
                            image="/images/liked.png"
                            name="Liked Songs"
                            href="liked"
                        />
                    </div>
                </div>
            </Header>

            {/* Section pour afficher les nouvelles chansons */}
            <div className="mt-2 mb-7 px-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-white text-2xl font-semibold">
                        Newest songs
                    </h1>
                </div>
                {/* Utilise le composant PageContent pour afficher les chansons */}
                <PageContent songs={songs}/>
            </div>
        </div>
    );
}
