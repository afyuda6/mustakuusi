<script lang="ts">
    import {onMount, onDestroy} from "svelte";
    import {activeRoute} from "@roxi/routify";
    import styles from "./Navbar.module.css";

    let menuOpen = false;
    let navbarRef: HTMLElement | null = null;

    $: currentPath = $activeRoute?.url.split("#")[0];

    const PREFIX = '/y';
    $: normalizedPath = currentPath.startsWith(PREFIX)
        ? currentPath.slice(PREFIX.length) || '/'
        : currentPath;

    $: isHomePage = normalizedPath === "/";
    $: isCharacterPage = normalizedPath.startsWith("/character");
    $: isGamePage = normalizedPath !== "/" && !normalizedPath.includes("privacy-policy") && !normalizedPath.startsWith("/character");

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (menuOpen && navbarRef && !navbarRef.contains(event.target as Node)) {
            menuOpen = false;
        }
    };

    onMount(() => {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
    });

    onDestroy(() => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
    });
</script>

<nav class={styles.navbar} bind:this={navbarRef}>
    <a
            href="/y"
            class={styles.title}
            on:click={() => {
                const html = document.documentElement;
                html.style.scrollBehavior = "auto";
                window.scrollTo(0, 0);
                setTimeout(() => {
                    html.style.scrollBehavior = "smooth";
                    }, 50);
            }}>mustakuusi</a>
    <div class={styles.menu}>
        <div
                class={`${styles.burger} ${menuOpen ? styles.open : ""}`}
                on:click={() => (menuOpen = !menuOpen)}
        >
            <span></span>
            <span></span>
            <span></span>
        </div>

        <ul
                class={`${styles.menuItems} ${menuOpen ? styles.menuOpen : ""}`}
                on:click={() => {menuOpen = false;}}
        >
            {#if isHomePage || isGamePage}
                <li><a href="#about" on:click={() => {
                    setTimeout(() => {
                        history.replaceState(null, '', window.location.pathname);
                        }, 200);
                }}>Tentang</a></li>
            {/if}

            {#if isHomePage || isCharacterPage}
                <li><a href="#games" on:click={() => {
                    setTimeout(() => {
                        history.replaceState(null, '', window.location.pathname);
                        }, 200);
                }}>Gim</a></li>
            {/if}

            {#if isHomePage || isGamePage}
                <li><a href="#characters" on:click={() => {
                    setTimeout(() => {
                        history.replaceState(null, '', window.location.pathname);
                        }, 200);
                }}>Karakter</a></li>
            {/if}

            {#if isGamePage}
                <li><a href="#screenshots" on:click={() => {
                    setTimeout(() => {
                        history.replaceState(null, '', window.location.pathname);
                        }, 200);
                }}>Cuplikan</a></li>
            {/if}

            <li><a href="#contact" on:click={() => {
                    setTimeout(() => {
                        history.replaceState(null, '', window.location.pathname);
                        }, 200);
                }}>Kontak</a></li>
        </ul>
    </div>
</nav>
