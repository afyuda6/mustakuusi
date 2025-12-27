import {useParams} from "react-router-dom";
import projects from "../data/projects.json";
import {Privacy} from "../components/Privacy/Privacy";
import {Contact} from "../components/Contact/Contact.tsx";
import {Navbar} from "../components/Navbar/Navbar.tsx";
import {useEffect} from "react";

export const PrivacyPolicyPage = () => {
    const {id} = useParams();
    const project = projects.find((p) => p.id === id);

    if (!project) {
        return <div></div>;
    }

    useEffect(() => {
        document.title = `${project.title} | mustakuusi`
    }, [project.title]);

    return (
        <div>
            <Navbar/>
            <Privacy
                id={id}
                title={project.title}/>
            <Contact/>
        </div>
    );
};