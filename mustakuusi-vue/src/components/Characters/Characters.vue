<script setup lang="ts">
import CharacterCard from "./CharacterCard.vue";
import styles from "./Characters.module.css";

interface CharacterData {
  id: string;
  name: string;
  imageSrc: string;
  description: string;
}

interface CharactersProps {
  characterSection: string;
  characters: CharacterData[];
}

const props = defineProps<CharactersProps>();
</script>

<template>
  <section :class="styles.container" id="characters">
    <h2 :class="styles.title">{{ props.characterSection }}</h2>
    <div :class="styles.characters">
      <CharacterCard v-for="character in characters" :key="character.id" :character="character"
                     :class="character.id === 'lato' ? styles.centered : ''"/>
    </div>
  </section>
</template>