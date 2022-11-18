<template>
 
 <!-- Menu header pour accéder à la page Liste et Connexion -->
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar class="menu" color="primary">
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-button @click="() => router.push('/liste')">Voir ma liste</ion-button>
      <ion-button @click="() => router.push('/signin')">Me Connexion</ion-button>
    </ion-menu>

    <!-- Mettre l'id en main-content et afficher le titre -->
    <ion-page class="cote" id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>Inscription</ion-title>
        </ion-toolbar>
      </ion-header>

    <!-- Création d'un formulaire -->
    <form @submit.prevent="handleSignup">
      <ion-card>
        <ion-item>
          <!-- Entrer le nom d'utilisateur -->
          <ion-label position="floating">Nom d'utilisateur :</ion-label>
          <ion-input v-model="form.username" id="username" required></ion-input>
        </ion-item>

        <ion-item>
          <!-- Entrer le mot de passe de l'utilisateur -->
          <ion-label position="floating">Mot de passe :</ion-label>
          <ion-input type="password" v-model="form.password" id="email" required></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Nom / Prénom :</ion-label>
          <ion-input v-model="form.name" id="name" required></ion-input>
        </ion-item>

        <ion-item>
          <!-- Boutton qui redirige vers la page signin une fois element renseigné -->
          <ion-button class="bouton" shape="round" href="/signin">
            S'inscrire
            <ion-icon slot="end" :icon="personAdd"></ion-icon>
          </ion-button>
        </ion-item>
        <ion-item>
          <ion-title class="centre">VOUS AVEZ DEJA UN COMPTE ?</ion-title>
        </ion-item>
        <ion-item>
          <!-- Bouttons qui redirige vers la page signin une fois identifié -->
          <ion-button class="bouton2" type="button" shape="round" router-link="/signin">
            S'identifier
            <ion-icon slot="end" :icon="logIn"></ion-icon>
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
import { mapActions, mapGetters } from "vuex";
import { useRouter } from 'vue-router';

export default {
  name: 'SignUp',
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
        password: "",
        name: "",
      }
    };
  },
  computed: {
    ...mapGetters("auth", ["authenticationError", "authenticationErrorCode"])
  },
  methods: {
    ...mapActions("auth", ["signup"]),
    async handleSignup() {
      if (
        this.form.name &&
        this.form.username &&
        this.form.password
      ) {
        const registerUser = {
          name: this.form.name,
          username: this.form.username,
          password: this.form.password
        };
        this.signup(registerUser).then(async () => {
          const alert = await alertController
            .create({
              header: 'Success',
              subHeader: 'Signup Success',
              message: 'Your username signup successfully.',
              buttons: ['OK'],
            });
          this.form.name = ""
          this.form.username = ""
          this.form.password = ""
          await alert.present()
        }).catch((err: any) => {
          console.log(err)
        })
      } else {
        const errorAlert = await alertController
          .create({
            header: 'Failed',
            subHeader: 'Signup Failed',
            message: 'You are not fill the form completely.',
            buttons: ['OK'],
          });
        await errorAlert.present
      }
    },

  }
}
</script>