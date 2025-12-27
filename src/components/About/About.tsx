import styles from "./About.module.css";

interface AboutProps {
    about: string;
    itemTitle: string;
    itemDescription: string;
    privacyPolicyLink?: string;
}

export const About = ({about, itemTitle, itemDescription, privacyPolicyLink}: AboutProps) => {
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
                            <p>
                                📄 Read our full <a href={privacyPolicyLink}>Privacy
                                    Policy</a>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    )
}