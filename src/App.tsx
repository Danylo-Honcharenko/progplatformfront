import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import './style/App.scss'
import './style/index.css'
import Registration from "./pages/Registration.tsx";
import CoursePage from "@/pages/CoursePage.tsx";
import UserPanel from "@/pages/UserPanel.tsx";
import ChangePassword from "@/pages/ChangePassword.tsx";
import UserProfile from "@/pages/UserProfile.tsx";
import TopicsPage from "@/pages/TopicsPage.tsx";
import Panel from "@/components/Panel.tsx";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            Component: Home,
        },
        {
            path: "/login",
            Component: Login,
        },
        {
            path: "/registration",
            Component: Registration,
        },
        {
            path: "/course/:courseId",
            Component: CoursePage,
        },
        {
            path: "/course/:courseId/module/:moduleId/topic",
            Component: TopicsPage,
        },
        {
            path: "/panel",
            Component: Panel,
            children: [
                {
                    index: true,
                    Component: UserPanel
                },
                {
                    path: "user-profile",
                    Component: UserProfile
                }
            ]
        },
        {
            path: "/change-password",
            Component: ChangePassword
        }
    ]);

    return <RouterProvider router={router} />;
}

export default App
