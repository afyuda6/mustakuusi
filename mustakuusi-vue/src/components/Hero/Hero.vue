<script setup lang="ts">
import {useRoute} from "vue-router";
import {useInView} from "../../hooks/useInView.ts";
import styles from "./Hero.module.css";
import {getImageUrl} from "../../utils.ts";

interface HeroProps {
  title: string;
  description?: string;
  downloadLink?: string;
  playLink?: string;
  imageUrl: string;
}

const props = defineProps<HeroProps>();

const route = useRoute();
const isHomePage = route.path === "/";
const isCharacterPage = route.path.startsWith("/character/");
const isGamePage = route.path !== "/" && !isCharacterPage;

const {ref: refEl, isVisible} = useInView(0.18);
void refEl;

function removeHash() {
  setTimeout(() => {
    history.replaceState(null, '', window.location.pathname);
  }, 200);
}
</script>

<template>
  <section ref="refEl" :class="[styles.container, styles.fadeUp, isVisible ? styles.visible : '']">
    <div :class="styles.content">
      <h1 :class="styles.title">{{ props.title }}</h1>
      <p :class="styles.description">{{ props.description }}</p>
      <a v-if="isHomePage" href="#games" :class="styles.gameBtn" @click="removeHash">Cari Gim</a>
      <div v-if="isGamePage" :class="styles.buttonGroup">
        <a v-if="props.downloadLink" :href="props.downloadLink" target="_blank" rel="noopener"><img
            :src="getImageUrl(`googlebadge.png`)"
            alt="Unduh di Google Play"
            :class="styles.badge"
        /></a>
        <a v-if="props.playLink" :href="props.playLink" target="_blank" rel="noopener"><img
            :src="getImageUrl(`itchbadge.png`)"
            alt="Main di itch.io"
            :class="styles.badge"
        /></a>
      </div>
    </div>
    <img :src="getImageUrl(props.imageUrl)" alt="hero"
         :class="isCharacterPage ? styles.characterHeroImg : styles.heroImg"/>
  </section>
</template>