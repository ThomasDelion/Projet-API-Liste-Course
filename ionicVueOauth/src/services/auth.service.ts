import ApiService from "./api.service";
import { TokenService } from "./token.service";
import { AxiosRequestConfig } from "axios";
import qs from "qs";

// Classe après les importations qui gèrent l'erreur d'authentification.
class AuthenticationError extends Error {
    errorCode: any;
    constructor(errorCode: any, message: string | undefined) {
        super(message);
        this.name = this.constructor.name;
        if (message != null) {
            this.message = message;
        }
        this.errorCode = errorCode;
    }
}

// constante principale, ajoutez une fonction asynchrone pour demander le jeton d'authentification au serveur OAuth2. La demande contient des en-têtes d'autorisation avec l'ID client OAuth2 chiffré et les valeurs secrètes. Le corps de la requête utilise une forme encodée d'URL et le contenu de la forme du corps est un objet JSON sous forme de chaîne. La réponse du serveur est un ID utilisateur, un jeton d'accès, un jeton d'actualisation et une date d'expiration. Le jeton d'accès et le jeton d'actualisation seront enregistrés dans le stockage local. De plus, l'intercepteur HTTP a été activé pour intercepter l'état d'erreur 401.
const AuthService = {
    // Fonction pour demander le nouveau jeton par jeton d'actualisation. Cette fonction est similaire à la fonction précédente, à l'exception du corps de la requête qui utilise simplement grant_type et actualise la valeur du jeton.
    signIn: async function(signInData: any) {
        const requestData: AxiosRequestConfig = {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: 'Basic ' + btoa(process.env.VUE_APP_CLIENT_ID + ':' + process.env.VUE_APP_CLIENT_SECRET)
            },
            url: "/oauth/token",
            data: qs.stringify({
                "grant_type": "password",
                username: signInData.username,
                password: signInData.password
            })
        };

        try {
            const response = await ApiService.customRequest(requestData);
            TokenService.saveToken(response.data.access_token);
            TokenService.saveRefreshToken(response.data.refresh_token);
            ApiService.setHeader();

            ApiService.mount401Interceptor();

            return response.data.access_token;
        } catch (error) {
            this.catchError(error);
        }
    },

    // Fonction pour déconnecter ou déconnecter l'utilisateur connecté en nettoyant les jetons et les en-têtes de requête uniquement.
    signOut() {
        TokenService.removeToken();
        TokenService.removeRefreshToken();
        ApiService.removeHeader();
        ApiService.unmount401Interceptor();
    },

    // Fonction pour demander des données POST afin de créer un nouvel utilisateur sur le serveur OAuth2. Cette fois, le corps de la requête utilise simplement un corps brut ou brut au format JSON.
    signup: async function(email: any, password: any, name: any) {
        const signupData: AxiosRequestConfig = {
            method: "post",
            headers: { "Content-Type": "application/json" },
            url: "/oauth/signup",
            data: {
                email: email,
                password: password,
                name: name
            }
        };

        try {
            return await ApiService.customRequest(signupData);
        } catch (error) {
            this.catchError(error);
        }
    },

    // Fonction qui appelle à partir des fonctions précédentes lorsqu'une demande à l'API a échoué.
    catchError: function(error: any) {
        let status;
        let description;

        if (error.response === undefined) {
            status = error.message;
            description = error.message;
        } else {
            status = error.response.status;
            description = error.response.data.error_description;
        }

        throw new AuthenticationError(status, description);
    }
}

export {AuthenticationError, AuthService} 
