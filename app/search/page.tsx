// Importation de la fonction getSongsByTitle depuis le fichier "@/actions/getSongsByTitle"
import getSongsByTitle from "@/actions/getSongsByTitle";
// Importation des composants React nécessaires
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "@/app/search/components/SearchContent";

// Définition de l'interface SearchProps pour définir le type des propriétés passées à Search
interface SearchProps {
    searchParams: {
        // Représente le titre utilisé comme paramètre de recherche
        title: string;
    };
}

// Définition du composant Search
const Search = async ({ searchParams }: SearchProps) => {
    // Récupération des chansons correspondant au titre spécifié
    const songs = await getSongsByTitle(searchParams.title);

    // Retourne le contenu du composant Search
    return (
        <div
            className="
                bg-neutral-900
                rounded-lg
                h-full
                w-full
                overflow-hidden
                overflow-y-auto
            "
        >
            {/* En-tête de la page de recherche */}
            <Header
                className="from-bg-neutral-900"
            >
                <div className="mb-2 flex flex-col gap-y-6">
                    {/* Titre de la page de recherche */}
                    <h1 className="text-white text-3xl font-semibold">
                        Search
                    </h1>
                    {/* Champ de recherche pour saisir le titre */}
                    <SearchInput />
                </div>
            </Header>
            {/* Contenu de la page de recherche avec les chansons trouvées */}
            <SearchContent songs={songs} />
        </div>
    );
};


export default Search;
