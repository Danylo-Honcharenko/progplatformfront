import PanelHeader from "@/components/PanelHeader.tsx";
import {Navigate, Outlet} from "react-router-dom";
import useAuthContext from "@/hooks/useAuthContext.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";

const PanelLayout = () => {

    const {authUser, loggingOut} = useAuthContext();

    if (authUser.notAuthorized) return <Navigate to="/login" replace/>;

    return (
        <>
            <PanelHeader />
            <div className="px-14">
                {authUser.loading ?
                    <div className="flex justify-center items-center mt-4">
                        <Spinner className="size-8" />
                    </div>
                    :
                    <Outlet />
                }
            </div>
            {loggingOut &&
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
                    <Spinner className="size-8"/>
                </div>
            }
        </>
    );
};

export default PanelLayout;