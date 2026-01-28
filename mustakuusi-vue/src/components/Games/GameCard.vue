<script setup lang="ts">
import {useInView} from "../../hooks/useInView.ts";
import styles from "./GameCard.module.css";
import {getImageUrl} from "../../utils.ts";

interface GameProps {
  title: string;
  imageSrc: string;
  date: string;
  description: string;
  categories: string[];
  detail: string;
  downloadLink: string;
  playLink: string;
}

interface GameCardProps {
  game: GameProps;
}

const props = defineProps<GameCardProps>();

const {ref: refEl, isVisible} = useInView(0.18);
void refEl;

const scrollToTop = () => {
  const html = document.documentElement;
  html.style.scrollBehavior = "auto";

  requestAnimationFrame(() => {
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      html.style.scrollBehavior = "smooth";
    });
  });
};
</script>

<template>
  <div ref="refEl" :class="[styles.container, styles.fadeUp, isVisible ? styles.visible : '']">
    <div :class="styles.card">
      <img :src="getImageUrl(props.game.imageSrc)" :alt="`Image of ${props.game.title}`" :class="styles.image"/>
      <h3 :class="styles.title">
        <router-link
            :to="props.game.detail"
            @click="scrollToTop"
        >{{ props.game.title }}
        </router-link>
      </h3>
      <time :class="styles.date" :dateTime="props.game.date">Dirilis: {{ props.game.date }}</time>
      <p :class="styles.description">{{ props.game.description }}</p>
      <ul :class="styles.categories">
        <li :class="styles.category" v-for="(category, id) in props.game.categories" :key="id">{{ category }}</li>
      </ul>
      <div :class="styles.links">
        <a v-if="props.game.downloadLink" :href="props.game.downloadLink" target="_blank" rel="noopener"><img
            :src="getImageUrl(`googlebadge.png`)"
            alt="Unduh di Google Play"
            :class="styles.badge"
        /></a>
        <a v-if="props.game.playLink" :href="props.game.playLink" target="_blank" rel="noopener"><img
            :src="getImageUrl(`itchbadge.png`)"
            alt="Main di itch.io"
            :class="styles.badge"
        /></a>
      </div>
    </div>
  </div>
</template>