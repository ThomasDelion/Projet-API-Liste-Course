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
  <ion-page class="cote" id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>MA LISTE DE COURSE</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Mettre en fullscreen le content et afficher le titre -->
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">MA LISTE DE COURSE</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Entrer les produits souhaités par l'utilisateur -->
      <ion-item class="espace">
        <ion-label position="floating">Entrer votre produit :</ion-label>
        <ion-input type="text" v-model="produit"></ion-input>
      </ion-item>

      <!-- Ajouter le produit entré à la liste -->
      <div id="usercard" class="espace">
        <ion-button class="bouton" color="primary" @click="addUser">Ajouter le produit à ma liste</ion-button>

        <!-- Afficher le produit entré par l'utilisateur et ajouter une liste (reset la liste) -->
        <div id="list__users">
          <user-card v-for="(user, index) in users" :key="index" :produit="user.produit" :score="user.score" />
        </div>
        <ion-button class="bouton2" color="primary" @click="resetUser">Ajouter une liste</ion-button>
      </div>
    </ion-content>
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

.md {
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



<script>
import { defineComponent, ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import UserCard from "@/components/UserCard";
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Tab2Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonItem, IonLabel, IonInput, IonButton, UserCard },
  setup() {
 
    let users = ref([])
    let produit = ref('')
    let score = ref(0)

    const addUser = () => {
      users.value.push({
        produit: produit.value,
        score: 0
      })

      produit.value = ''
    }

    const resetUser = () => {
      users.value = []
    }

    const resetScore = () => {
      users.value.score = 0
    }

    const router = useRouter();
    return { router, users, produit, score, addUser, resetUser, resetScore }
  }
});
</script>
