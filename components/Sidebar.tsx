// "use client" assure que ce composant s'exécute uniquement dans le navigateur, exploitant la fonctionnalité des composants exclusivement clients de Next.js 13.
"use client"

import {usePathname} from "next/navigation";
import {useMemo} from "react";
import {HiHome} from "react-icons/hi";
import {BiSearch} from "react-icons/bi";
import Box from "@/components/Box";
import SidebarItem from "@/components/SidebarItem";
import Library from "@/components/Library";

// Déclaration de l'interface des props, spécifiant la prop children pour le support des composants imbriqués.
interface SidebarProps {
    children : React.ReactNode
}
// Définition du composant fonctionnel Sidebar avec la prop children déstructurée.
const Sidebar : React.FC<SidebarProps>= ({
    children
}) => {

    // Obtention du chemin de la route actuelle pour le style du lien actif.
    const pathname = usePathname();

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
        <div className="flex h-full">
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
                <Library>

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

