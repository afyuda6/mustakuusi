import {useParams} from "react-router-dom";
import projects from "../data/projects.json";
import {Privacy} from "../components/Privacy/Privacy";
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
    screenshots: string[];
}

export const PrivacyPolicyPage = () => {
    const {id} = useParams();
    const project = (projects as ProjectData[]).find((p) => p.id === id);

    if (!project) {
        return <h2 style={{textAlign: "center"}}>Project not found</h2>;
    }

    return (
        <div>
            <Navbar/>
            <Privacy id={id}/>
            <Contact/>
        </div>
    );
};