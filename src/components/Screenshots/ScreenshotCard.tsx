import styles from "./ScreenshotCard.module.css";
import {getImageUrl} from "../../utils.ts";

interface ScreenshotCardProps {
    title: string;
    imageSrc: string;
}

export const ScreenshotCard = ({title, imageSrc}: ScreenshotCardProps) => {
    return (
        <div className={styles.container}>
            <img src={getImageUrl(imageSrc)} alt={title} className={styles.image}/>
        </div>
    )
}