import {Price} from "@/types";

/**
 * `getURL` récupère l'URL de base du site à partir des variables d'environnement.
 * - Utilise `NEXT_PUBLIC_SITE_URL` ou `NEXT_PUBLIC_VERCEL_URL` pour obtenir l'URL du site.
 * - Par défaut, retourne `http://localhost:3000/` si aucune variable d'environnement n'est définie.
 * - Ajoute `https://` si l'URL ne commence pas par `http`.
 * - Ajoute un `/` à la fin de l'URL si ce n'est pas déjà présent.
 * Cette fonction est utilisée pour obtenir l'URL de base du site dans diverses situations.
 */
export const getURL = () => {
    // Récupère l'URL de base du site
    let url =
        process.env?.NEXT_PUBLIC_SITE_URL ?? // URL définie par `NEXT_PUBLIC_SITE_URL`
        process.env?.NEXT_PUBLIC_VERCEL_URL ?? // URL définie par `NEXT_PUBLIC_VERCEL_URL`
        'http://localhost:3000/'; // Valeur par défaut

    // Ajoute `https://` si l'URL ne commence pas par `http`
    url = url.includes('http') ? url : `https://${url}`;

    // Ajoute un `/` à la fin si ce n'est pas déjà présent
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;

    // Retourne l'URL
    return url;
};

/**
 * `postData` envoie une requête POST à l'URL donnée avec les données fournies.
 * - Prend `url` comme URL de la requête.
 * - `data` contient les données à envoyer, optionnellement de type `Price`.
 * - Utilise `fetch` pour envoyer la requête avec les options POST appropriées.
 * - Vérifie si la requête est réussie, sinon lance une erreur.
 * Cette fonction est utilisée pour envoyer des données à un serveur via une requête POST.
 */
export const postData = async ({
                                   url,
                                   data
                               }: {
    url: string; // URL de la requête POST
    data?: { price: Price }; // Données à envoyer
}) => {
    // Affiche des informations sur la requête POST
    console.log('POST REQUEST:', url, data);

    // Envoie une requête POST avec `fetch`
    const res: Response = await fetch(url, {
        method: 'POST', // Méthode POST
        headers: new Headers({ 'Content-Type': 'application/json' }), // En-têtes
        credentials: 'same-origin', // Inclut les cookies
        body: JSON.stringify(data) // Convertit `data` en JSON
    });

    // Vérifie si la requête a réussi
    if (!res.ok) {
        // Affiche une erreur si la requête a échoué
        console.log('Error in POST', { url, data, res });
        throw new Error(res.statusText); // Lance une erreur
    }

    // Retourne la réponse JSON
    return res.json();
};

/**
 * `toDateTime` convertit les secondes en un objet `Date` représentant la date/heure.
 * - Crée un objet `Date` basé sur l'époque UNIX.
 * - Utilise `setSeconds` pour ajouter le nombre de secondes donné.
 * - Retourne l'objet `Date` mis à jour.
 * Cette fonction est utilisée pour convertir des secondes en un format `Date`.
 */
export const toDateTime = (secs: number) => {
    // Crée une nouvelle date à partir de l'époque UNIX
    var t = new Date('1970-01-01T00:30:00Z');

    // Ajoute les secondes données à la date
    t.setSeconds(secs);

    // Retourne l'objet `Date`
    return t;
};
