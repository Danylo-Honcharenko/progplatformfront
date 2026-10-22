import {useContext} from "react";
import {AuthContext} from "@/AuthProvider.tsx";

const useAuthContext = () => {

    const authContext = useContext(AuthContext);

    if (!authContext) throw new Error("useAuthContext must be used in AuthProvider");

    return authContext;
};

export default useAuthContext;