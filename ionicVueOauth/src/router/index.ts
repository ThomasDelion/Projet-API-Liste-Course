import { createRouter, createWebHistory } from '@ionic/vue-router';
import Liste from '../views/Liste.vue'
import Signin from "../views/Signin.vue";
import Signup from "../views/Signup.vue";
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/liste'
  },

  {
    // Création de la route "login" pour accéder à la liste.
    name: 'signin',
    path: '/signin', 
    component: Signin,
  },

  {
    // Création de la route "liste" pour accéder à la liste.
    name: 'signup',
    path: '/signup',
    component: Signup
  },

  {
    // Création de la route "liste" pour accéder à la liste.
    path: '/liste',
    component: Liste
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
