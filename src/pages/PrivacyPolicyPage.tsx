import {useParams} from "react-router-dom";
import {Privacy} from "../components/Privacy/Privacy";

export const PrivacyPolicyPage = () => {
    const {id} = useParams<{ id: string }>();

    return (
        <Privacy id={id}/>
    );
};