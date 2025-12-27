import styles from "./About.module.css";
import {useLocation} from "react-router-dom";

interface AboutProps {
    about: string;
    itemTitle: string;
    itemDescription: string;
    privacyPolicyLink?: string;
}

export const About = ({about, itemTitle, itemDescription, privacyPolicyLink}: AboutProps) => {
    const location = useLocation();
    const isProjectPage = location.pathname !== "/" && !location.pathname.includes("privacy-policy");

    return (
        <section className={styles.container} id="about">
            <h2 className={styles.title}>{about}</h2>
            <div className={styles.content}>
                <ul className={styles.aboutItems}>
                    <li className={styles.aboutItem}>
                        <div className={styles.aboutItemText}>
                            <h3>{itemTitle}</h3>
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