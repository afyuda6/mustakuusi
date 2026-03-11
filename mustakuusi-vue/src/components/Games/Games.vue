<script setup lang="ts">
import GameCard from "./GameCard.vue";
import styles from "./Games.module.css";

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
}

interface GamesProps {
  gameSection: string;
  games: GameData[];
}

const props = defineProps<GamesProps>();
</script>

<template>
  <section :class="styles.container" id="games">
    <h2 :class="styles.title">{{props.gameSection}}</h2>
    <div :class="styles.games">
      <GameCard v-for="game in props.games" :key="game.id" :game="game"/>
    </div>
  </section>
</template>