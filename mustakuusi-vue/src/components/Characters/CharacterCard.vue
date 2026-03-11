<script setup lang="ts">
import {useInView} from "../../hooks/useInView.ts";
import styles from "./CharacterCard.module.css";
import {getImageUrl} from "../../utils.ts";

interface CharacterProps {
  id?: string;
  name: string;
  imageSrc: string;
  description: string;
}

interface CharacterCardProps {
  character: CharacterProps;
}

const props = defineProps<CharacterCardProps>();

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
      <div :class="styles.imagecon">
        <img :src="getImageUrl(props.character.imageSrc)" :alt="`Image of ${props.character.name}`"
             :class="styles.image"/>
      </div>
      <router-link
          :to="`/character/${props.character.id}`"
          :class="styles.title"
          @click="scrollToTop"
      >{{ props.character.name }}
      </router-link>
    </div>
  </div>
</template>