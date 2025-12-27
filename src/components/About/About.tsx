import styles from "./About.module.css";
import {useLocation} from "react-router-dom";
import {useInView} from "../../hooks/useInView.tsx";

interface AboutProps {
    about: string;
    itemDescription: string;
    privacyPolicyLink?: string;
}

export const About = ({about, itemDescription, privacyPolicyLink}: AboutProps) => {
    const {ref, isVisible} = useInView(0.3);

    const location = useLocation();
    const isProjectPage = location.pathname !== "/" && !location.pathname.includes("privacy-policy");

    return (
        <section ref={ref} className={`${styles.container} ${styles.fadeUp} ${isVisible ? styles.visible : ""}`}
                 id="about">
            <h2 className={styles.title}>{about}</h2>
            <div className={styles.content}>
                <ul className={styles.aboutItems}>
                    <li className={styles.aboutItem}>
                        <div className={styles.aboutItemText}>
                            <p>{itemDescription}</p>
                            <br/>
                            {isProjectPage && (<p>
                                📄 Read our full <a href={privacyPolicyLink}>Privacy
                                Policy</a>
                            </p>)}
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    )
}