import {useParams} from "react-router-dom";
import {Privacy} from "../components/Privacy/Privacy";
import {Contact} from "../components/Contact/Contact.tsx";
import {Navbar} from "../components/Navbar/Navbar.tsx";

export const PrivacyPolicyPage = () => {
    const {id} = useParams();
    return (
        <div>
            <Navbar/>
            <Privacy id={id}/>
            <Contact/>
        </div>
    );
};