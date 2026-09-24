import PanelHeader from "@/components/PanelHeader.tsx";
import useAuth from "@/hooks/useAuth.tsx";
import {Outlet} from "react-router-dom";

const Panel = () => {
    const {loadingUser, user} = useAuth();

    return (
        <>
            <PanelHeader
                loading={loadingUser}
                user={user}
            />
            <div className="pl-35 pr-35 pt-3">
                <Outlet />
            </div>
        </>
    );
};

export default Panel;