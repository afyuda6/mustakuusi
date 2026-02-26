<script lang="ts">
    import { params } from '@roxi/routify';
    import Navbar from "../../../components/Navbar/Navbar.svelte";
    import Privacy from "../../../components/Privacy/Privacy.svelte";
    import Contact from "../../../components/Contact/Contact.svelte";
    import games from "../../../../../public/data/games.json";

    export let id = $params.id;
    export let game = games.find(g => g.id === id) ?? null;

    if (game) {
        document.title = `${game.title} | mustakuusi`;
    } else {
        document.title = 'mustakuusi';
    }
</script>

{#if game}
    <Navbar/>
    <Privacy {id} title={game.title}/>
    <Contact/>
{:else}
    <div></div>
{/if}
