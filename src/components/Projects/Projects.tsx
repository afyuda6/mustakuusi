import styles from "./Projects.module.css";
import projects from "../../data/projects.json";
import {ProjectCard} from "./ProjectCard.tsx";
import {useInView} from "../../hooks/useInView.tsx";

interface ProjectProps {
    title: string;
    imageSrc: string;
    description: string;
    skills: string[];
    detail: string;
    source: string;
}

export const Projects = () => {
    const {ref, isVisible} = useInView(0.05);

    return (
        <section ref={ref} className={`${styles.container} ${styles.fadeUp} ${isVisible ? styles.visible : ""}`}
                 id="projects">
            <h2 className={styles.title}>Projects</h2>
            <div className={styles.projects}>
                {
                    projects.map((project: ProjectProps, id) => {
                        return (
                            <ProjectCard key={id} project={project}/>
                        )
                    })
                }
            </div>
        </section>
    )
}