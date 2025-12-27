import styles from "./Hero.module.css";
import {getImageUrl} from "../../utils.ts";
import {useLocation} from "react-router-dom";
import {useInView} from "../../hooks/useInView.tsx";

interface HeroProps {
    title: string;
    description: string;
    buttonLink?: string;
    downloadLink?: string;
    playLink?: string;
    imageUrl: string;
}

export const Hero = ({title, description, buttonLink, downloadLink, playLink, imageUrl}: HeroProps) => {
    const {ref, isVisible} = useInView(0.3);

    const location = useLocation();
    const isProjectPage = location.pathname !== "/";

    return (
        <section ref={ref} className={`${styles.container} ${styles.fadeUp} ${isVisible ? styles.visible : ""}`}>
            <div className={styles.content}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.description}>{description}</p>
                {!isProjectPage && (
                    <a href={buttonLink} className={styles.contactBtn}>Projects</a>
                )}
                {isProjectPage && (
                    <div className={styles.buttonGroup}>
                        <a href={downloadLink} className={styles.contactBtn}>Download</a>
                        <a href={playLink} className={styles.contactBtn}>Play</a>
                    </div>
                )}
            </div>
            <img src={getImageUrl(`${imageUrl}`)} alt="hero" className={styles.heroImg}/>
            <div className={styles.topBlur}/>
            <div className={styles.bottomBlur}/>
        </section>
    )
}