<script setup lang="ts">
import {useRoute} from "vue-router";
import Navbar from "../components/Navbar/Navbar.vue";
import Privacy from "../components/Privacy/Privacy.vue";
import Contact from "../components/Contact/Contact.vue";
import games from "../../../public/data/games.json";

const route = useRoute();
const id = route.params.id as string;
const game = games.find((p) => p.id === id);

if (game) {
  document.title = `${game.title} | mustakuusi`;
}
</script>

<template>
  <div v-if="game">
    <Navbar/>
    <Privacy :id="id" :title="game.title"/>
    <Contact/>
  </div>
  <div v-else></div>
</template>