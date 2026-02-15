<script setup lang="ts">
import {useRoute} from "vue-router";
import Navbar from "../components/Navbar/Navbar.vue";
import Hero from "../components/Hero/Hero.vue";
import Games from "../components/Games/Games.vue";
import Contact from "../components/Contact/Contact.vue";
import characters from "../../../public/data/characters.json";
import games from "../../../public/data/games.json";

interface CharacterData {
  id: string;
  name: string;
  imageSrc: string;
  description: string;
}

interface GameData {
  id: string;
  title: string;
  imageSrc: string;
  date: string;
  description: string;
  categories: string[];
  detail: string;
  downloadLink: string;
  playLink: string;
  longDescription: string;
  privacyPolicyLink: string;
  screenshots: string[];
  characters: string[];
}

const route = useRoute();
const id = route.params.id as string;

const character = (characters as CharacterData[]).find((p) => p.id === id);

if (character) {
  document.title = `${character.name} | mustakuusi`;
}

const filteredGames = character ? (games as GameData[]).filter((p) =>
    p.characters.includes(character.id)
) : [];
</script>

<template>
  <div v-if="character">
    <Navbar/>
    <Hero
        :title="character.name"
        :imageUrl="character.imageSrc"
        :description="character.description"
    />
    <Games :gameSection="`${character.name} di Gim`" :games="filteredGames"/>
    <Contact/>
  </div>
  <div v-else>
  </div>
</template>