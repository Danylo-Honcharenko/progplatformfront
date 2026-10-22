import {createContext, FC, ReactNode, useCallback, useMemo, useState} from "react";
import useAuth, {Auth} from "@/hooks/useAuth.tsx";

type AuthContextValue = {
    authUser: Auth;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({children}) => {

    const {loading, user, authError, notAuthorized} = useAuth();
    const [loggedOut, setLoggedOut] = useState(false);

    const logout = useCallback(() => setLoggedOut(true), []);

    const value = useMemo<AuthContextValue>(() => ({
        authUser: loggedOut
            ? {loading: false, user: undefined, authError: undefined, notAuthorized: true}
            : {loading, user, authError, notAuthorized},
        logout,
    }), [loading, user, authError, notAuthorized, loggedOut, logout]);

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
