import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import './style/App.scss'
import './style/index.css'
import Registration from "./pages/Registration.tsx";
import CoursePage from "@/pages/CoursePage.tsx";
import UserPanel from "@/pages/UserPanel.tsx";
import UserProfile from "@/pages/UserProfile.tsx";
import TopicsPage from "@/pages/TopicsPage.tsx";
import PanelLayout from "@/components/PanelLayout.tsx";
import ErrorBoundary from "@/ErrorBoundary.tsx";
import {AuthProvider} from "@/AuthProvider.tsx";

const Layout = () => {
    return (
        <AuthProvider>
            <PanelLayout />
        </AuthProvider>
    );
}

export function App() {

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
            path: "/panel",
            Component: Layout,
            children: [
                {
                    index: true,
                    Component: UserPanel
                },
                {
                    path: "user-profile",
                    Component: UserProfile
                },
                {
                    path: "course/:courseId",
                    Component: CoursePage,
                },
                {
                    path: "course/:courseId/module/:moduleId/topic",
                    Component: TopicsPage,
                }
            ]
        },
        // {
        //     path: "/change-password",
        //     Component: ChangePassword
        // }
    ]);

    return (
        <ErrorBoundary>
            <RouterProvider router={router} />
        </ErrorBoundary>
    );
}
