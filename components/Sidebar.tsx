// "use client" assure que ce composant s'exécute uniquement dans le navigateur, exploitant la fonctionnalité des composants exclusivement clients de Next.js 13.
"use client"

import {usePathname} from "next/navigation";
import {useMemo} from "react";
import {HiHome} from "react-icons/hi";
import {BiSearch} from "react-icons/bi";
import Box from "@/components/Box";
import SidebarItem from "@/components/SidebarItem";
import Library from "@/components/Library";
import {Song} from "@/types";
import usePlayer from "@/hooks/usePlayer";
import {twMerge} from "tailwind-merge";

// Déclaration de l'interface des props, spécifiant la prop children pour le support des composants imbriqués.
interface SidebarProps {
    children : React.ReactNode
    songs : Song[]
}
// Définition du composant fonctionnel Sidebar avec la prop children déstructurée.
const Sidebar : React.FC<SidebarProps>= ({
    children,
    songs
}) => {

    // Obtention du chemin de la route actuelle pour le style du lien actif.
    const pathname = usePathname();

    const player = usePlayer();

    // Tableau des routes mémorisé pour optimiser les re-rendus, dépendant de pathname pour l'état actif.
    const routes = useMemo(()=>[
        {
            icon: HiHome,
            label : 'Home',
            active: pathname !=='/search',
            href :'/'
        },
        {
            icon: BiSearch,
            label : 'Search',
            active: pathname ==='/search',
            href :'/search'
        }

    ],[pathname])
    return (
        <div className={twMerge(`
            flex
            h-full
        `,
            player.activeId && "h-[calc(100%-80px)]"
            )}>
            <div
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
            <Box>
                <div className ="
                    flex
                    flex-col
                    gap-y-4
                    px-5
                    py-4
                ">
                    {routes.map((item)=>(
                        <SidebarItem
                            key = {item.label}
                            {...item}
                        />
                    ))}
                </div>
            </Box>

            <Box className="overflow-y-auto h-full">
                <Library songs = {songs}>

                </Library>
            </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    );
}
export default Sidebar;

