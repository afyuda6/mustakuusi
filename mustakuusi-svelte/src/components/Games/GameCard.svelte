<script lang="ts">
    import {onDestroy, onMount} from "svelte";
    import styles from "./GameCard.module.css";
    import {useInView} from "../../hooks/useInView";
    import {getImageUrl} from "../../utils";

    interface GameProps {
        title: string;
        imageSrc: string;
        date: string;
        description: string;
        categories: string[];
        detail: string;
        downloadLink: string;
        playLink: string;
    }

    export let game: GameProps;

    const {inView, isVisible} = useInView(0.18);
    let countdown: string = "";

    let timer: number;

    const updateCountdown = () => {
        if (!game.date) return;

        const now = new Date().getTime();
        const release = new Date(game.date).getTime();
        const diff = release - now;

        if (diff <= 0) {
            countdown = "Sudah rilis!";
            clearInterval(timer);
            return;
        }

        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        countdown = `${days} hari lagi`;
    };

    onMount(() => {
        if (!game.downloadLink && game.date) {
            updateCountdown();
            timer = setInterval(updateCountdown, 1000 * 60 * 60);
        }
    });

    onDestroy(() => {
        clearInterval(timer);
    });
</script>

<div
        use:inView
        class={`${styles.container} ${styles.fadeUp} ${$isVisible ? styles.visible : ""}`}
>
    <div class={styles.card}>
        <img
                src={getImageUrl(game.imageSrc)}
                alt={`Image of ${game.title}`}
                class={styles.image}
        />

        <h3 class={styles.title}>
            <a
                    href={`/y${game.detail}`}
                    on:click={() => {
                        const html = document.documentElement;
                        html.style.scrollBehavior = "auto";
                        requestAnimationFrame(() => {
                            window.scrollTo(0, 0);
                            requestAnimationFrame(() => {
                                html.style.scrollBehavior = "smooth";
                            });
                        });
                    }}
            >{game.title}</a>
        </h3>
        <time class={styles.date} dateTime={game.date}>Dirilis: {game.date}</time>

        <ul class={styles.categories}>
            {#each game.categories as category, id (id)}
                <li class={styles.category}>{category}</li>
            {/each}
        </ul>

        <div class={styles.links}>
            {#if game.downloadLink}
                <a href={game.downloadLink} target="_blank" rel="noopener"><img
                        src={getImageUrl("googlebadge.png")}
                        alt="Unduh di Google Play"
                        class={styles.badge}
                /></a>
            {:else}
                <h2 class={styles.badge}>{countdown || "Segera hadir"}</h2>
            {/if}
            {#if game.playLink}
                <a href={game.playLink} target="_blank" rel="noopener"><img
                        src={getImageUrl("itchbadge.png")}
                        alt="Main di itch.io"
                        class={styles.badge}
                /></a>
            {/if}
        </div>
    </div>
</div>
