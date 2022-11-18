// Variables constantes pour contenir les noms access_token et refresh_token.
const TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

// Fonction principale, ajoutez cette fonction CRUD (créer, lire, mettre à jour, supprimer) pour remplir le jeton d'accès et le jeton d'actualisation.
// Pour ce didacticiel, les jetons seront enregistrés dans localStorage. 
// Pour la production, vous pouvez utiliser la bibliothèque native de stockage sécurisé Ionic.
const TokenService = {
    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    },

    saveToken(accessToken: string) {
        localStorage.setItem(TOKEN_KEY, accessToken);
    },

    removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    },

    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    },

    saveRefreshToken(refreshToken: string) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    },

    removeRefreshToken() {
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    }

}

// Exportez cette constante principale en tant que module Typescript.
export { TokenService };