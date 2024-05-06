// "use client" assure que ce composant s'exécute uniquement dans le navigateur, exploitant la fonctionnalité des composants exclusivement clients de Next.js 13.
"use client";

// Importation du hook usePathname pour obtenir le chemin actuel dans Next.js
import { usePathname } from "next/navigation";

// Importation du hook useMemo pour optimiser les rendus de composants
import { useMemo } from "react";

// Importation des icônes utilisées pour les éléments de la barre latérale
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

// Importation de composants réutilisables personnalisés
import Box from "@/components/Box";
import SidebarItem from "@/components/SidebarItem";
import Library from "@/components/Library";

// Importation du type Song et du hook usePlayer
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

// Importation de la fonction twMerge pour combiner les classes CSS
import { twMerge } from "tailwind-merge";

// Interface des props du composant Sidebar
// `children` : éléments enfants à afficher dans la partie principale
// `songs` : tableau de chansons utilisé par le composant Library
interface SidebarProps {
    children: React.ReactNode;
    songs: Song[];
}

// Définition du composant Sidebar
// Utilise les props typées par SidebarProps
const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
    // Obtention du chemin de la route actuelle pour le style du lien actif
    const pathname = usePathname();

    // Appel du hook personnalisé usePlayer pour gérer le lecteur multimédia
    const player = usePlayer();

    // Déclaration des routes mémorisées
    // Elles dépendent de `pathname` pour déterminer l'état actif de chaque élément
    const routes = useMemo(() => [
        {
            icon: HiHome, // Icône de l'élément Home
            label: 'Home', // Étiquette de l'élément Home
            active: pathname !== '/search', // Actif si le chemin n'est pas `/search`
            href: '/' // Lien de l'élément Home
        },
        {
            icon: BiSearch, // Icône de l'élément Search
            label: 'Search', // Étiquette de l'élément Search
            active: pathname === '/search', // Actif si le chemin est `/search`
            href: '/search' // Lien de l'élément Search
        }

        // La dépendance sur `pathname` assure la mise à jour à chaque changement de route
    ], [pathname]);

    return (
        // La barre latérale et le contenu principal sont organisés en flex
        <div className={twMerge(`
            flex
            h-full
        `,
            // Ajustement de la hauteur en fonction de l'état du lecteur
            player.activeId && "h-[calc(100%-80px)]"
        )}>
            <div
                // Configuration de la barre latérale pour les écrans moyens et plus grands
                className="
                hidden
                md:flex
                flex-col
                gap-y-2
                bg-black
                h-full
                w-[300px]
                p-2
                "
            >
                {/* Boîte englobante pour les éléments de la barre latérale */}
                <Box>
                    <div className="
                        flex
                        flex-col
                        gap-y-4
                        px-5
                        py-4
                    ">
                        {/* Boucle sur les routes pour rendre chaque élément de la barre latérale */}
                        {routes.map((item) => (
                            <SidebarItem
                                key={item.label} // Utilisation de `label` comme clé unique
                                {...item} // Passage des propriétés d'item à SidebarItem
                            />
                        ))}
                    </div>
                </Box>

                {/* Boîte pour afficher la bibliothèque de chansons */}
                <Box className="overflow-y-auto h-full">
                    <Library songs={songs} />
                </Box>
            </div>

            {/* Contenu principal */}
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    );
}

export default Sidebar;
