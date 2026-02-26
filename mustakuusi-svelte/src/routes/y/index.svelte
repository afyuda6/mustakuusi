<script lang="ts">
    import {onMount} from "svelte";
    import Navbar from "../../components/Navbar/Navbar.svelte";
    import Hero from "../../components/Hero/Hero.svelte";
    import About from "../../components/About/About.svelte";
    import Games from "../../components/Games/Games.svelte";
    import Characters from "../../components/Characters/Characters.svelte";
    import Contact from "../../components/Contact/Contact.svelte";
    import characters from "../../../../public/data/characters.json";
    import games from "../../../../public/data/games.json";

    document.title = "mustakuusi";
</script>

<Navbar/>

<Hero
        title="Eksplorasi Teka-teki, Pengetahuan, dan Edukasi"
        description="Setiap dunia menawarkan cara baru untuk berpikir dan belajar melalui gim."
        downloadLink={undefined}
        playLink={undefined}
        imageUrl="hero.png"/>
<About
        about="Tentang"
        itemDescription="Kami merancang gim teka-teki logika, kuis pengetahuan, kuis edukasi, serta arkade kasual yang mudah dimainkan, menyenangkan, dan dapat mengasah cara berpikir. Kami berfokus pada pembuatan mekanik sederhana dan gameplay yang halus, sehingga setiap gim tidak hanya menghibur, tetapi juga memberikan nilai edukatif. Tujuan kami adalah menciptakan pengalaman bermain yang membawa keceriaan, pembelajaran, dan imajinasi bagi pemain dari berbagai usia."
        privacyPolicyLink={undefined}/>
<Games
        gameSection="Gim"
        games={games}/>
<Characters
        characterSection="Karakter"
        characters={characters}/>
<Contact/>
