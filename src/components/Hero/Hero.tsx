import styles from "./Hero.module.css";
import {getImageUrl} from "../../utils.ts";
import {useLocation} from "react-router-dom";

interface HeroProps {
    title: string;
    description: string;
    buttonLink?: string;
    downloadLink?: string;
    playLink?: string;
    imageUrl: string;
}

export const Hero = ({title, description, buttonLink, downloadLink, playLink, imageUrl}: HeroProps) => {
    const location = useLocation();
    const isProjectPage = location.pathname !== "/";

    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.description}>{description}</p>
                {!isProjectPage && (
                    <a href={buttonLink} className={styles.contactBtn}>Contact Us</a>
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