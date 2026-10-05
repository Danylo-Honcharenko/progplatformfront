import PanelHeader from "@/components/PanelHeader.tsx";
import {Outlet} from "react-router-dom";
import {AuthContext} from "@/AuthProvider.tsx";
import {useContext} from "react";
import {Spinner} from "@/components/ui/spinner.tsx";

const PanelLayout = () => {

    const authContext = useContext(AuthContext);

    return (
        <>
            <PanelHeader />
            <div className="px-14">
                {authContext?.authUser.loading ?
                    <div className="flex justify-center items-center mt-4">
                        <Spinner className="size-8" />
                    </div>
                    :
                    <Outlet />
                }
            </div>
        </>
    );
};

export default PanelLayout;