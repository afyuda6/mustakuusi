<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from "vue";
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

const countdown = ref("");

let timer: number;

const updateCountdown = () => {
  if (!props.game.date) return;

  const now = new Date().getTime();
  const release = new Date(props.game.date).getTime();
  const diff = release - now;

  if (diff <= 0) {
    countdown.value = "";
    clearInterval(timer);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  countdown.value = `${days} hari lagi`;
};

onMounted(() => {
  if (props.game.date) {
    updateCountdown();
    timer = setInterval(updateCountdown, 1000 * 60 * 60);
  }
});

onBeforeUnmount(() => {
  clearInterval(timer);
});

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
      <time :class="styles.date" :dateTime="props.game.date">Dirilis: {{
          new Date(props.game.date).toLocaleDateString("id-ID", {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
          })
        }} WIB
      </time>
      <ul :class="styles.categories">
        <li :class="styles.category" v-for="(category, id) in props.game.categories" :key="id">{{ category }}</li>
      </ul>
      <div :class="styles.links">
        <h2 v-if="countdown" :class="styles.badge">{{ countdown }}</h2>
        <a v-if="!countdown && props.game.downloadLink" :href="props.game.downloadLink" target="_blank"
           rel="noopener"><img
            :src="getImageUrl(`googlebadge.png`)"
            alt="Unduh di Google Play"
            :class="styles.badge"
        /></a>
        <a v-if="!countdown && props.game.playLink" :href="props.game.playLink" target="_blank" rel="noopener"><img
            :src="getImageUrl(`itchbadge.png`)"
            alt="Main di itch.io"
            :class="styles.badge"
        /></a>
      </div>
    </div>
  </div>
</template>