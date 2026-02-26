<script setup lang="ts">
import ScreenshotCard from "./ScreenshotCard.vue";
import styles from "./Screenshots.module.css";

interface ScreenshotsProps {
  screenshots: string[];
  title: string;
}

const props = defineProps<ScreenshotsProps>();
</script>

<template>
  <section :class="styles.container" id="screenshots">
    <h2 :class="styles.title">Cuplikan</h2>
    <div :class="styles.screenshots">
      <ScreenshotCard v-for="(src, id) in screenshots" :key="id" :imageSrc="src" :title="props.title"/>
    </div>
  </section>
</template>