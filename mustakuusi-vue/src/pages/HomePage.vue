<script setup lang="ts">
import Navbar from "../components/Navbar/Navbar.vue";
import Hero from "../components/Hero/Hero.vue";
import About from "../components/About/About.vue";
import Games from "../components/Games/Games.vue";
import Characters from "../components/Characters/Characters.vue";
import Contact from "../components/Contact/Contact.vue";
import characters from "../../../public/data/characters.json";
import games from "../../../public/data/games.json";

document.title = `mustakuusi`;
</script>

<template>
  <Navbar/>
  <Hero
      title="Eksplorasi Teka-teki, Pengetahuan, dan Edukasi"
      description="Setiap dunia menawarkan cara baru untuk berpikir dan belajar melalui gim."
      imageUrl="hero.png"
  />
  <About
      about="Tentang"
      itemDescription="Kami merancang gim teka-teki logika, kuis pengetahuan, kuis edukasi, serta arkade kasual yang mudah dimainkan, menyenangkan, dan dapat mengasah cara berpikir. Kami berfokus pada pembuatan mekanik sederhana dan gameplay yang halus, sehingga setiap gim tidak hanya menghibur, tetapi juga memberikan nilai edukatif. Tujuan kami adalah menciptakan pengalaman bermain yang membawa keceriaan, pembelajaran, dan imajinasi bagi pemain dari berbagai usia."
  />
  <Games
      gameSection="Gim"
      :games="games"
  />
  <Characters
      character-section="Karakter"
      :characters="characters"
  />
  <Contact/>
</template>