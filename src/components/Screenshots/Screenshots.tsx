import styles from "./Screenshots.module.css";
import {ScreenshotCard} from "./ScreenshotCard.tsx";
import {useInView} from "../../hooks/useInView.tsx";

interface ScreenshotsProps {
    screenshots: string[];
    title: string;
}

export const Screenshots = ({screenshots, title}: ScreenshotsProps) => {
    const {ref, isVisible} = useInView(0.05);

    return (
        <section ref={ref} className={`${styles.container} ${styles.fadeUp} ${isVisible ? styles.visible : ""}`}
                 id="screenshots">
            <h2 className={styles.title}>Screenshots</h2>
            <div className={styles.screenshots}>
                {screenshots.map((src, id) => (
                    <ScreenshotCard key={id} imageSrc={src} title={title}/>
                ))}
            </div>
        </section>
    );
};