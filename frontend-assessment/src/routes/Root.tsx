import {Outlet} from "react-router-dom";

export default function Root() {
    return (
        <div className="flex h-screen bg-gray-50">
            <Outlet/>
        </div>
    );
}