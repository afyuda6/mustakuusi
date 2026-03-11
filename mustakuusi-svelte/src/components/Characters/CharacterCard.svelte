<script lang="ts">
    import styles from "./CharacterCard.module.css";
    import {useInView} from "../../hooks/useInView";
    import {getImageUrl} from "../../utils";

    interface CharacterProps {
        id?: string;
        name: string;
        imageSrc: string;
        description: string;
    }

    export let character: CharacterProps;

    export let className: any;

    const {inView, isVisible} = useInView(0.18);
</script>

<div
        use:inView
        class={`${styles.container} ${styles.fadeUp} ${$isVisible ? styles.visible : ""} ${className || ""}`}
>
    <div class={styles.card}>
        <div class={styles.imagecon}>
            <img
                    src={getImageUrl(character.imageSrc)}
                    alt={`Image of ${character.name}`}
                    class={styles.image}
            />
        </div>

        {#if character.id}
            <a
                    href={`/y/character/${character.id}`}
                    class={styles.title}
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
            >{character.name}
            </a>
        {:else}
            <span class={styles.title}>{character.name}</span>
        {/if}
    </div>
</div>
