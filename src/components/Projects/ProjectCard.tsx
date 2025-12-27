import styles from "./ProjectCard.module.css";
import {getImageUrl} from "../../utils";
import {useInView} from "../../hooks/useInView.tsx";

interface ProjectProps {
    title: string;
    imageSrc: string;
    description: string;
    skills: string[];
    detail: string;
    source: string;
}

interface ProjectCardProps {
    project: ProjectProps;
}

export const ProjectCard = ({project: {title, imageSrc, description, skills, detail, source}}: ProjectCardProps) => {
    const {ref, isVisible} = useInView(0.05);

    return (
        <div ref={ref} className={`${styles.container} ${styles.fadeUp} ${isVisible ? styles.visible : ""}`}>
            <div className={styles.card}>
                <img src={getImageUrl(imageSrc)} alt={`Image of ${title}`} className={styles.image}/>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
                <ul className={styles.skills}>
                    {
                        skills.map((skill, id) => {
                            return <li key={id} className={styles.skill}>{skill}</li>;
                        })
                    }
                </ul>
                <div className={styles.links}>
                    <a href={detail} className={styles.link}>View</a>
                    <a href={source} className={styles.link}>Source</a>
                </div>
            </div>
        </div>
    )
}