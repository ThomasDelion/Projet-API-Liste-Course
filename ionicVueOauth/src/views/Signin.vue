<template>

<!-- Menu header pour accéder à la page Liste et Connexion -->
<ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar class="menu" color="primary">
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-button @click="() => router.push('/liste')">Voir ma liste</ion-button>
      <ion-button @click="() => router.push('/signin')">Me Connecter</ion-button>
    </ion-menu>

    <!-- Mettre l'id en main-content et afficher le titre -->
    <ion-page class="cote" id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>Connexion</ion-title>
        </ion-toolbar>
      </ion-header>
      
    <!-- Création d'un formulaire -->
    <form @submit.prevent="handleLogin">
      <ion-card>
        <ion-item>
          <!-- Entrer le nom d'utilisateur -->
          <ion-label position="floating">Nom d'utilisateur :</ion-label>
          <ion-input v-model="form.username" id="username" required></ion-input>
        </ion-item>

        <ion-item>
           <!-- Entrer le mot de passe de l'utilisateur -->
          <ion-label position="floating">Mot de passe :</ion-label>
          <ion-input type="password" v-model="form.password" id="password" required></ion-input>
        </ion-item>

        <ion-item>
          <!-- Bouttons qui redirige vers la page liste une fois identifié -->
          <ion-button class="bouton" shape="round" href="/liste">
            S'identifier
            <ion-icon slot="end" :icon="logIn"></ion-icon>
          </ion-button>
        </ion-item>
        <ion-item>
        <ion-title class="centre">OU</ion-title>
        </ion-item>
        <ion-item>
          <!-- Bouttons qui redirige vers la page signup pour s'inscrire -->
          <ion-button class="bouton2" type="button" shape="round" router-link="/signup">
            S'inscrire
            <ion-icon slot="end" :icon="personAdd"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-card>
    </form>
  </ion-page>
</template>

<style lang="css">
/* Le css du menu.*/
ion-menu::part(backdrop) {
  background-color: #695252;
}

ion-menu::part(container) {
  border-radius: 0 20px 20px 0;

  box-shadow: 4px 0px 1px #695252;
  justify-content: flex-start !important;
}

.ion-page {
  justify-content: flex-start !important;
}

.md{
  margin-inline: 0px !important;
}

/* Le reste du css de la page.*/
p {
  padding-top: 3px;
}

.ion-color-light {
  --ion-color-base: transparent !important;
  border: 0.1px solid #1e1e1e;
  border-radius: 3px;
}


.list-md {
  padding: 5px !important;
  background: none !important;
  border-radius: 22px;
}

.contour {
  border: 0.1px solid #fff;
}

body {
  font-family: 'Roboto', sans-serif;
}

h2 {
  font-family: 'Oswald', sans-serif;
}

.centre {
  text-align: center;
}

.cote {
  padding: 5px;
  margin: 30px;
}

.espace {
  margin-top: 10px;
}

.bouton {
  width: 100%;
  justify-content: flex-start !important;
}

.bouton2 {
  width: 100%;
  justify-content: flex-start !important;
}
</style>

<script lang="ts">
import { IonTitle, IonPage, IonCard, IonItem, IonLabel, IonButton, IonInput, alertController, IonIcon } from '@ionic/vue'
import { logIn, personAdd } from 'ionicons/icons';
import { mapActions, mapGetters } from "vuex"
import { useRouter } from 'vue-router';

export default {
  name: 'SignIn',
  components: { IonTitle, IonPage, IonCard, IonItem, IonLabel, IonButton, IonInput, IonIcon },
  setup() {
// Activer la liaison des routes pour le menu
const router = useRouter();
    return {
      router,
      logIn,
      personAdd
    };
  },
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters("auth", [
      "authenticating",
      "authenticationError",
      "authenticationErrorCode"
    ])
  },
  methods: {
    ...mapActions("auth", ["signIn"]),
    async handleLogin() {
      this.signIn(this.form).then(() => {
        this.form.username = ""
        this.form.password = ""
        this.router.push("/tabs/tab1")
      }).catch(async (err: any) => {
        const errorAlert = await alertController
          .create({
            header: 'Failed',
            subHeader: 'Sign in Failed',
            message: err,
            buttons: ['OK'],
          });
        await errorAlert.present()
      })
    }
  }
}

</script>
