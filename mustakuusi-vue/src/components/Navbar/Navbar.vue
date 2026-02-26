<script setup lang="ts">
import {useRoute} from 'vue-router';
import {ref, computed, onMounted, onUnmounted} from 'vue';
import styles from './Navbar.module.css';

const menuOpen = ref(false);
const navbarRef = ref<HTMLElement | null>(null);
const route = useRoute();

const isHomePage = computed(() => route.path === '/');
const isCharacterPage = computed(() => route.path.startsWith('/character'));
const isGamePage = computed(
    () =>
        route.path !== '/' &&
        !route.path.includes('privacy-policy') &&
        !route.path.includes('character')
);

const handleClickOutside = (event: Event) => {
  if (menuOpen.value && navbarRef.value && !navbarRef.value.contains(event.target as Node)) {
    menuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
  document.addEventListener('touchstart', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  document.removeEventListener('touchstart', handleClickOutside)
})

const scrollToTop = () => {
  const html = document.documentElement;

  html.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);

  setTimeout(() => {
    html.style.scrollBehavior = "smooth";
  }, 50);
};

function removeHash() {
  setTimeout(() => {
    history.replaceState(null, '', window.location.pathname);
  }, 200);
}
</script>

<template>
  <nav :class="styles.navbar" ref="navbarRef">
    <router-link
        to="/"
        :class="styles.title"
        @click="scrollToTop"
    >mustakuusi</router-link>
    <div :class="styles.menu">
      <div
          :class="[styles.burger, menuOpen ? styles.open : '']"
          @click="menuOpen = !menuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul
          :class="[styles.menuItems, menuOpen ? styles.menuOpen : '']"
          @click="menuOpen = false"
      >
        <li v-if="isHomePage || isGamePage">
          <a href="#about" @click="removeHash">Tentang</a>
        </li>
        <li v-if="isHomePage || isCharacterPage">
          <a href="#games" @click="removeHash">Gim</a>
        </li>
        <li v-if="isHomePage || isGamePage">
          <a href="#characters" @click="removeHash">Karakter</a>
        </li>
        <li v-if="isGamePage">
          <a href="#screenshots" @click="removeHash">Cuplikan</a>
        </li>
        <li>
          <a href="#contact" @click="removeHash">Kontak</a>
        </li>
      </ul>
    </div>
  </nav>
</template>