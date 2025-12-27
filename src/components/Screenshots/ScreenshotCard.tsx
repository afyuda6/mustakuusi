import styles from "./ScreenshotCard.module.css";
import {getImageUrl} from "../../utils.ts";
import {useInView} from "../../hooks/useInView.tsx";

interface ScreenshotCardProps {
    title: string;
    imageSrc: string;
}

export const ScreenshotCard = ({title, imageSrc}: ScreenshotCardProps) => {
    const {ref, isVisible} = useInView(0.05);

    return (
        <div ref={ref} className={`${styles.container} ${styles.fadeUp} ${isVisible ? styles.visible : ""}`}>
            <img src={getImageUrl(imageSrc)} alt={title} className={styles.image}/>
        </div>
    )
}