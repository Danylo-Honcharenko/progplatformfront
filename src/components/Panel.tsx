import PanelHeader from "@/components/PanelHeader.tsx";
import {Outlet} from "react-router-dom";
import {AuthProvider} from "@/components/AuthProvider.tsx";

const Panel = () => {

    return (
        <AuthProvider>
            <PanelHeader />
            <div className="px-14">
                <Outlet />
            </div>
        </AuthProvider>
    );
};

export default Panel;