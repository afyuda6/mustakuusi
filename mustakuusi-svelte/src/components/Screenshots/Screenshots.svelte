<script lang="ts">
    import ScreenshotCard from "./ScreenshotCard.svelte";
    import styles from "./Screenshots.module.css";

    export let screenshots: string[];
    export let title: string;
</script>

<section class={styles.container} id="screenshots">
    <h2 class={styles.title}>Cuplikan</h2>
    <div class={styles.screenshots}>
        {#each screenshots as src, id (id)}
            <ScreenshotCard imageSrc={src} title={title} />
        {/each}
    </div>
</section>