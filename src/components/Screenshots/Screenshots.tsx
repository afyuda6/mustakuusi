import styles from "./Screenshots.module.css";
import {ScreenshotCard} from "./ScreenshotCard.tsx";

interface ScreenshotsProps {
    screenshots: string[];
    title: string;
}

export const Screenshots = ({screenshots, title}: ScreenshotsProps) => {
    return (
        <section className={styles.container} id="screenshots">
            <h2 className={styles.title}>Screenshots</h2>
            <div className={styles.screenshots}>
                {screenshots.map((src, id) => (
                    <ScreenshotCard key={id} imageSrc={src} title={title}/>
                ))}
            </div>
        </section>
    );
};