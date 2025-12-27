import {useParams} from "react-router-dom";
import projects from "../data/projects.json";
import {Hero} from "../components/Hero/Hero";
import {About} from "../components/About/About";
import {Screenshots} from "../components/Screenshots/Screenshots.tsx";
import {Contact} from "../components/Contact/Contact.tsx";
import {Navbar} from "../components/Navbar/Navbar.tsx";

interface ProjectData {
    id: string;
    title: string;
    imageSrc: string;
    description: string;
    skills: string[];
    detail: string;
    downloadLink: string;
    playLink: string;
    source: string;
    longDescription: string;
    privacyPolicyLink: string;
    screenshots: string[];
}

export const ProjectPage = () => {
    const {id} = useParams();
    const project = (projects as ProjectData[]).find((p) => p.id === id);

    if (!project) {
        return <h2 style={{textAlign: "center"}}>Project not found</h2>;
    }

    return (
        <div>
            <Navbar/>
            <Hero
                title={project.title}
                description={project.description}
                downloadLink={project.downloadLink}
                playLink={project.playLink}
                imageUrl={project.imageSrc}
            />
            <About
                about="About the Game"
                itemDescription={project.longDescription}
                privacyPolicyLink={project.privacyPolicyLink}
            />
            <Screenshots
                screenshots={project.screenshots}
                title={project.title}
            />
            <Contact/>
        </div>
    );
};
