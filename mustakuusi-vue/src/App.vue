<script setup lang="ts">
import {createRouter, createWebHistory, RouterView} from 'vue-router';
import {getCurrentInstance} from 'vue';
import Marquee from './components/Marquee/Marquee.vue';
import Footer from './components/Footer/Footer.vue';
import HomePage from "./pages/HomePage.vue";
import GamePage from "./pages/GamePage.vue";
import CharacterPage from "./pages/CharacterPage.vue";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.vue";
import styles from './App.module.css';

const routes = [
  {path: '/', component: HomePage},
  {path: '/:id', component: GamePage},
  {path: '/character/:id', component: CharacterPage},
  {path: '/privacy-policy/:id', component: PrivacyPolicyPage},
  {path: '/:pathMatch(.*)*', component: {template: '<div></div>'}},
]

const router = createRouter({
  history: createWebHistory('/g'),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.path !== '/' && to.path.endsWith('/')) {
    next({path: to.path.slice(0, -1), query: to.query, replace: true});
  } else {
    next();
  }
});

const app = getCurrentInstance()?.appContext.app
if (app) app.use(router)
</script>

<template>
  <div :class="styles.App">
    <Marquee/>
    <RouterView/>
    <Footer/>
  </div>
</template>