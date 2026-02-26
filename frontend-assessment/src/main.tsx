import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css'
import Root from "./routes/Root";
import RegionPage, {loader as regionLoader} from "./routes/RegionPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        children: [
            {index: true, element: <RegionPage/>, loader: regionLoader},
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
