<script lang="ts">
    import styles from "./ScreenshotCard.module.css";
    import { useInView } from "../../hooks/useInView";
    import { getImageUrl } from "../../utils";

    export let title: string;
    export let imageSrc: string;

    const { inView, isVisible } = useInView(0.18);
</script>

<div
        use:inView
        class={`${styles.container} ${styles.fadeUp} ${$isVisible ? styles.visible : ""}`}
>
    <img
            src={getImageUrl(imageSrc)}
            alt={title}
            class={styles.image}
    />
</div>
