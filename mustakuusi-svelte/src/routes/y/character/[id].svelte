<script lang="ts">
    import {params} from '@roxi/routify';
    import Navbar from "../../../components/Navbar/Navbar.svelte";
    import Hero from "../../../components/Hero/Hero.svelte";
    import Games from "../../../components/Games/Games.svelte";
    import Contact from "../../../components/Contact/Contact.svelte";
    import characters from "../../../../../public/data/characters.json";
    import games from "../../../../../public/data/games.json";

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

    export let character = (characters as CharacterData[]).find(c => c.id === id) ?? null;

    export let filteredGames = character
        ? (games as GameData[]).filter(g => g.characters.includes(character.id))
        : [];

    if (character) {
        document.title = `${character.name} | mustakuusi`;
    } else {
        document.title = 'mustakuusi';
    }
</script>

{#if character}
    <Navbar/>
    <Hero
            title={character.name}
            description={character.description}
            downloadLink={undefined}
            playLink={undefined}
            imageUrl={character.imageSrc}/>
    <Games gameSection={`${character.name} di Gim`} games={filteredGames}/>
    <Contact/>
{:else}
    <div></div>
{/if}
