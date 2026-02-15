<script lang="ts">
    import {activeRoute} from "@roxi/routify";
    import {useInView} from "../../hooks/useInView";
    import styles from "./About.module.css";

    export let about: string;
    export let itemDescription: string;
    export let privacyPolicyLink: string | undefined;

    $: currentPath = $activeRoute?.url.split("#")[0];

    const PREFIX = '/y';
    $: normalizedPath = currentPath.startsWith(PREFIX)
        ? currentPath.slice(PREFIX.length) || '/'
        : currentPath;

    $: isGamePage = normalizedPath !== "/";

    const {inView, isVisible} = useInView(0.18);
</script>

<section
        use:inView
        class={`${styles.container} ${styles.fadeUp} ${$isVisible ? styles.visible : ""}`}
        id="about"
>
    <h2 class={styles.title}>{about}</h2>
    <div class={styles.content}>
        <ul class={styles.aboutItems}>
            <li class={styles.aboutItem}>
                <div class={styles.aboutItemText}>
                    <p>{itemDescription}</p>
                    <br/>
                    {#if isGamePage && privacyPolicyLink}
                        <p>
                            📄 <a
                                href={`/y${privacyPolicyLink}`}
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
                        >Privacy Policy</a>
                        </p>
                    {/if}
                </div>
            </li>
        </ul>
    </div>
</section>