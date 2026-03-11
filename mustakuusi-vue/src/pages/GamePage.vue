<script setup lang="ts">
import {useRoute} from "vue-router";
import Navbar from "../components/Navbar/Navbar.vue";
import Hero from "../components/Hero/Hero.vue";
import About from "../components/About/About.vue";
import Characters from "../components/Characters/Characters.vue";
import Screenshots from "../components/Screenshots/Screenshots.vue";
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

const game = (games as GameData[]).find((p) => p.id === id);

if (game) {
  document.title = `${game.title} | mustakuusi`;
}

const filteredCharacters = game
    ? (characters as CharacterData[]).filter((c) =>
        game.characters.includes(c.id)
    )
    : [];
</script>

<template>
  <div v-if="game">
    <Navbar/>
    <Hero
        :title="game.title"
        :description="game.description"
        :downloadLink="game.downloadLink"
        :playLink="game.playLink"
        :imageUrl="game.imageSrc"
        :date="game.date"
    />
    <About
        about="Tentang Gim"
        :itemDescription="game.longDescription"
        :privacyPolicyLink="game.privacyPolicyLink"
    />
    <Characters
        characterSection="Karakter di Gim"
        :characters="filteredCharacters"/>
    <Screenshots
        :screenshots="game.screenshots"
        :title="game.title"
    />
    <Contact/>
  </div>
  <div v-else>
  </div>
</template>