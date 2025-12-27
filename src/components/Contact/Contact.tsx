import styles from "./Contact.module.css";
import {getImageUrl} from "../../utils.ts";

export const Contact = () => {
    return (
        <footer className={styles.container} id="contact">
            <div className={styles.text}>
                <h2>Contact</h2>
            </div>
            <ul className={styles.links}>
                <li className={styles.link}>
                    <img src={getImageUrl("emailIcon.png")} alt="email icon"/>
                    <a href="mailto:fajaryudaapriliano@gmail.com">fajaryudaapriliano@gmail.com</a>
                </li>
                <li className={styles.link}>
                    <img src={getImageUrl("linkedinIcon.png")} alt="linkedin icon"/>
                    <a href="https://www.linkedin.com/in/afyuda6">linkedin.com/in/afyuda6</a>
                </li>
                <li className={styles.link}>
                    <img src={getImageUrl("githubIcon.png")} alt="github icon"/>
                    <a href="https://www.github.com/afyuda6">github.com/afyuda6</a>
                </li>
            </ul>
        </footer>
    )
}