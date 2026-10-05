import {createContext, FC, ReactNode, useEffect, useRef, useState} from "react";
import useAuth, {Auth} from "@/hooks/useAuth.tsx";

type AuthContext = {
    authUser: Auth;
    setAuthUser: (user: Auth) => void;
};

export const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({children}) => {

    const auth = useAuth();
    const [authUser, setAuthUser] = useState<Auth>(auth);
    const hasLoginUpdate = useRef(false);

    useEffect(() => {
        if (!hasLoginUpdate.current) {
            setAuthUser(auth);
        }
    }, [auth.loading, auth.user, auth.authError, auth.notAuthorized]);

    const setLoggedInUser = (userAuth: Auth) => {
        hasLoginUpdate.current = true;
        setAuthUser(userAuth);
    };

    return (
        <AuthContext.Provider value={{authUser, setAuthUser: setLoggedInUser}}>
            {children}
        </AuthContext.Provider>
    );
};
