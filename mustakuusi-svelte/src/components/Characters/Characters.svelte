<script lang="ts">
    import CharacterCard from "./CharacterCard.svelte";
    import styles from "./Characters.module.css";

    interface CharacterData {
        id: string;
        name: string;
        imageSrc: string;
    }

    export let characterSection: string;
    export let characters: CharacterData[];
</script>

<section class={styles.container} id="characters">
    <h2 class={styles.title}>{characterSection}</h2>
    <div class={styles.characters}>
        {#each characters as character (character.id)}
            <CharacterCard {character} />
        {/each}
    </div>
</section>
