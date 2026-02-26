<script lang="ts">
    import GameCard from "./GameCard.svelte";
    import styles from "./Games.module.css";

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
    }

    export let gameSection: string;
    export let games: GameData[];
</script>

<section class={styles.container} id="games">
    <h2 class={styles.title}>{gameSection}</h2>
    <div class={styles.games}>
        {#each games as game (game.id)}
            <GameCard {game}/>
        {/each}
    </div>
</section>
