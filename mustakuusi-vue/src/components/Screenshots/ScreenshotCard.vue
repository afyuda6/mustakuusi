<script setup lang="ts">
import {useInView} from "../../hooks/useInView.ts";
import styles from "./ScreenshotCard.module.css";
import {getImageUrl} from "../../utils.ts";

interface ScreenshotCardProps {
  title: string;
  imageSrc: string;
}

const props = defineProps<ScreenshotCardProps>();

const {ref: refEl, isVisible} = useInView(0.18);
void refEl;
</script>

<template>
  <div ref="refEl" :class="[styles.container, styles.fadeUp, isVisible ? styles.visible : '']">
    <img :src="getImageUrl(props.imageSrc)" :alt="props.title" :class="styles.image"/>
  </div>
</template>