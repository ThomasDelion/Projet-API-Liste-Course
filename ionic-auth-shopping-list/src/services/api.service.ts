import axios, { AxiosRequestConfig } from "axios";
import {store} from '@/store';
import {TokenService} from "@/services/token.service";
import {loadingController} from '@ionic/vue';

const ApiService = {
    _requestInterceptor: 0,
    _401interceptor: 0,

    init(baseURL: string | undefined) {
        axios.defaults.baseURL = baseURL;
    },

    // Fonction pour intercepter le paramètre d'en-têtes de requête HTTP pour le jeton d'autorisation reçu après la connexion réussie.
    setHeader() {
        axios.defaults.headers.common[
            "Authorization"
            ] = `Bearer ${TokenService.getToken()}`;
    },

    // Fonction pour effacer les en-têtes de requête HTTP.
    removeHeader() {
        axios.defaults.headers.common = {};
    },

    // Fonctions pour implémenter les requêtes Axios GET, POST, PUT, DELETE et personnalisées.
    get(resource: string) {
        return axios.get(resource);
    },

    post(resource: string, data: any) {
        return axios.post(resource, data);
    },

    put(resource: string, data: any) {
        return axios.put(resource, data);
    },

    delete(resource: string) {
        return axios.delete(resource);
    },

    customRequest(data: AxiosRequestConfig) {
        return axios(data);
    },

    // Fonction pour intercepter la requête HTTP puis affichez le Ionic/Vue loadingController .
    mountRequestInterceptor() {
        this._requestInterceptor = axios.interceptors.request.use(async config => {
            console.log("show loading");
            const loading = await loadingController.create({
                message: 'Please wait...'
            });
            await loading.present();

            return config;
        });
    },

    // Fonction pour intercepter la réponse HTTP avec le statut 401. 
    // Ainsi, le statut 401 capturé sera redirigé vers la page de connexion en appelant la fonction signOut. 
    // Sinon, le statut 401 sera traité comme le jeton expiré qui déclenchera la fonction refreshToken . 
    mount401Interceptor() {
        this._401interceptor = axios.interceptors.response.use(
            response => {
                loadingController.dismiss().then(r => console.log(r));
                return response;
            },
            async error => {
                loadingController.dismiss().then(r => console.log(r));
                if (error.request.status === 401) {
                    if (error.config.url.includes("oauth/token")) {
                        await store.dispatch("auth/signOut");
                        throw error;
                    } else {
                        try {
                            await store.dispatch("auth/refreshToken");
                            return this.customRequest({
                                method: error.config.method,
                                url: error.config.url,
                                data: error.config.data
                            });
                        } catch (e) {
                            throw error;
                        }
                    }
                }
                throw error;
            }
        );
    },

    // Fonction pour éjecter l'intercepteur d'état de réponse HTTP 401.
    unmount401Interceptor() {
        axios.interceptors.response.eject(this._401interceptor);
    } 
}

// Exportez les fonctions constantes ci-dessus en tant que module Typescript.
export default ApiService;


