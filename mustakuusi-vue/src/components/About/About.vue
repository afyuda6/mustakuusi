<script setup lang="ts">
import {useRoute} from "vue-router";
import {useInView} from "../../hooks/useInView.ts";
import styles from "./About.module.css";

interface AboutProps {
  about: string;
  itemDescription: string;
  privacyPolicyLink?: string;
}

const props = defineProps<AboutProps>();

const route = useRoute();
const isGamePage = route.path !== "/";

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
  <section ref="refEl" :class="[styles.container, styles.fadeUp, isVisible ? styles.visible : '']" id="about">
    <h2 :class="styles.title">{{ props.about }}</h2>
    <div :class="styles.content">
      <ul :class="styles.aboutItems">
        <li :class="styles.aboutItem">
          <div :class="styles.aboutItemText">
            <p>{{ props.itemDescription }}</p>
            <br/>
            <p v-if="isGamePage && props.privacyPolicyLink">
              📄
              <router-link
                  :to="props.privacyPolicyLink"
                  @click="scrollToTop"
              >Privacy Policy
              </router-link>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>