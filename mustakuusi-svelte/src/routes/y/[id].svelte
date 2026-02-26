<script lang="ts">
    import {params} from '@roxi/routify';
    import Navbar from "../../components/Navbar/Navbar.svelte";
    import Hero from "../../components/Hero/Hero.svelte";
    import About from "../../components/About/About.svelte";
    import Characters from "../../components/Characters/Characters.svelte";
    import Screenshots from "../../components/Screenshots/Screenshots.svelte";
    import Contact from "../../components/Contact/Contact.svelte";
    import characters from "../../../../public/data/characters.json";
    import games from "../../../../public/data/games.json";

    interface CharacterData {
        id: string;
        name: string;
        imageSrc: string;
        description: string;
    }

    interface GameData {
        id: string;
        title: string;
        imageSrc: string;
        date: string;
        description: string;
        categories: string[];
        detail: string;
        downloadLink: string;
        playLink: string;
        longDescription: string;
        privacyPolicyLink: string;
        screenshots: string[];
        characters: string[];
    }

    export let id = $params.id;

    export let game = (games as GameData[]).find(g => g.id === id) ?? null;

    export let filteredCharacters = game
        ? (characters as CharacterData[]).filter(c => game.characters.includes(c.id))
        : [];

    if (game) {
        document.title = `${game.title} | mustakuusi`;
    } else {
        document.title = 'mustakuusi';
    }
</script>

{#if game}
    <Navbar/>
    <Hero
            title={game.title}
            description={game.description}
            downloadLink={game.downloadLink}
            playLink={game.playLink}
            imageUrl={game.imageSrc}
            date={game.date}/>
    <About
            about="Tentang Gim"
            itemDescription={game.longDescription}
            privacyPolicyLink={game.privacyPolicyLink}/>
    <Characters
            characterSection="Karakter di Gim"
            characters={filteredCharacters}/>
    <Screenshots
            screenshots={game.screenshots}
            title={game.title}/>
    <Contact/>
{:else}
    <div></div>
{/if}
