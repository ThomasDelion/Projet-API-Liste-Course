import {AuthenticationError, AuthService} from "@/services/auth.service";
import { TokenService } from "@/services/token.service";

// Variable constante qui contient la paire clé-valeur des objets d'état.
const state = {
    authenticating: false,
    accessToken: TokenService.getToken(),
    authenticationErrorCode: 0,
    authenticationError: "",
    refreshTokenPromise: null
};

// Variable constante pour obtenir les états requis. Cette fois, nous renvoyons simplement l'authentification, le code d'erreur d'authentification et le message d'erreur.
const getters = {
    authenticationErrorCode: (state: { authenticationErrorCode: any }) => {
        return state.authenticationErrorCode;
    },

    authenticationError: (state: { authenticationError: any }) => {
        return state.authenticationError;
    },

    authenticating: (state: { authenticating: any }) => {
        return state.authenticating;
    }
};

// Variable constante d'action qui contient les opérations permettant de gérer les états de connexion, d'enregistrement, d'actualisation du jeton et de déconnexion. Aussi, appelez le commit des mutations d'état. 
const actions = {
    async signIn(context: any, signInData: any) {
        context.commit("signInRequest");
        return new Promise((resolve, reject) => {
            AuthService.signIn(signInData).then(res => {
                context.commit("signInSuccess", res);
                resolve(res);
            }).catch(err => {
                if (err instanceof AuthenticationError) {
                    context.commit("signInError", {
                        errorCode: err.errorCode,
                        errorMessage: err.message
                    });
                    reject(err.message);
                }
            });
        });
    },

    signOut(context: any) {
        context.commit("signOutRequest");
        return new Promise<void>((resolve) => {
            AuthService.signOut();
            resolve();
        });
    },

    refreshToken(context: any, state: { refreshTokenPromise: any }) {
        if (!state.refreshTokenPromise) {
            const p = AuthService;
            context.commit("refreshTokenPromise", p);
        }

        return state.refreshTokenPromise;
    },

    async signup(context: any, {email, password, name}: any) {
        try {
            await AuthService.signup(email, password, name);
            context.commit("processSuccess");
            return true;
        } catch (e) {
            if (e instanceof AuthenticationError) {
                context.commit("signInError", {
                    errorCode: e.errorCode,
                    errorMessage: e.message
                });
            }
            return false;
        }
    },

    setAuthenticatingStatus(context: any, status: any) {
        context.commit("setAuthenticatingStatus", status);
    },
};

// Variable constante qui définit tous les commits précédemment appelés à partir de l'action.
const mutations = {
    signInRequest(state: {
        authenticating: boolean;
        authenticationError: string;
        authenticationErrorCode: number;
    }) {
        state.authenticating = true;
        state.authenticationError = "";
        state.authenticationErrorCode = 0;
    },

    signInSuccess(state: {
        accessToken: any;
        authenticating: boolean;
    }, accessToken: any) {
        state.accessToken = accessToken;
        state.authenticating = false;
    },

    signInError(state: {
        authenticating: boolean;
        authenticationErrorCode: any;
        authenticationError: any;
    }, {errorCode, errorMessage}: any) {
        state.authenticating = false;
        state.authenticationErrorCode = errorCode;
        state.authenticationError = errorMessage;
    },

    signOutRequest(state: { authenticating: boolean }) {
        state.authenticating = false;
    },

    refreshTokenPromise(state: { refreshTokenPromise: any }, promise: any) {
        state.refreshTokenPromise = promise;
    },

    processSuccess(state: { authenticating: boolean }) {
        state.authenticating = false;
    },

    setAuthenticatingStatus(state: { authenticating: any }, status: any) {
        state.authenticating = status;
    }
};

// Exporte la constante principale en tant que module d'authentification qui exécute l'état, les getters, les actions et les mutations.
export const auth = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};


