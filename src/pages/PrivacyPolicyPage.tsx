import {useParams} from "react-router-dom";
import {Privacy} from "../components/Privacy/Privacy";

export const PrivacyPolicyPage = () => {
    const {id} = useParams();

    return (
        <Privacy id={id}/>
    );
};