<script lang="ts">
    import {activeRoute} from "@roxi/routify";
    import {useInView} from "../../hooks/useInView";
    import styles from "./Hero.module.css";
    import {getImageUrl} from "../../utils";
    import {onDestroy, onMount} from "svelte";

    export let title: string;
    export let description: string | undefined;
    export let downloadLink: string | undefined;
    export let playLink: string | undefined;
    export let imageUrl: string;
    export let date: string | undefined;

    $: currentPath = $activeRoute?.url.split("#")[0];

    const PREFIX = '/y';
    $: normalizedPath = currentPath.startsWith(PREFIX)
        ? currentPath.slice(PREFIX.length) || '/'
        : currentPath;

    $: isHomePage = normalizedPath === "/";
    $: isCharacterPage = normalizedPath.startsWith("/character");
    $: isGamePage = normalizedPath !== "/" && !normalizedPath.includes("privacy-policy") && !normalizedPath.startsWith("/character");

    const {inView, isVisible} = useInView(0.18);

    let countdown: string = "";

    let timer: number;

    const updateCountdown = () => {
        if (!date) return;

        const now = new Date().getTime();
        const release = new Date(date).getTime();
        const diff = release - now;

        if (diff <= 0) {
            countdown = "";
            clearInterval(timer);
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        countdown = `${days} hari lagi`;
    };

    onMount(() => {
        if (date) {
            updateCountdown();
            timer = setInterval(updateCountdown, 1000 * 60 * 60);
        }
    });

    onDestroy(() => {
        clearInterval(timer);
    });
</script>

<section
        use:inView
        class={`${styles.container} ${styles.fadeUp} ${$isVisible ? styles.visible : ""}`}
>
    <div class={styles.content}>
        <h1 class={styles.title}>{title}</h1>
        {#if description}
            <p class={styles.description}>{@html description}</p>
        {/if}

        {#if isHomePage}
            <a href="#games" class={styles.gameBtn} on:click={() => {
                setTimeout(() => {
                    history.replaceState(null, '', window.location.pathname);
                    }, 200);
            }}>Cari Gim</a>
        {/if}

        {#if isGamePage}
            <div class={styles.buttonGroup}>
                {#if countdown}
                    <h2 class={styles.badge}>{countdown}</h2>
                {/if}
                {#if !countdown && downloadLink}
                    <a href={downloadLink} target="_blank" rel="noopener"><img
                            src={getImageUrl("googlebadge.png")}
                            alt="Unduh di Google Play"
                            class={styles.badge}
                    /></a>
                {/if}
                {#if !countdown && playLink}
                    <a href={playLink} target="_blank" rel="noopener"><img
                            src={getImageUrl("itchbadge.png")}
                            alt="Main di itch.io"
                            class={styles.badge}
                    /></a>
                {/if}
            </div>
        {/if}
    </div>

    <img
            src={getImageUrl(imageUrl)}
            alt="hero"
            class={isCharacterPage ? styles.characterHeroImg : styles.heroImg}
    />
</section>
