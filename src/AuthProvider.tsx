import {createContext, FC, ReactNode, useCallback, useMemo, useState} from "react";
import useAuth, {Auth} from "@/hooks/useAuth.tsx";
import {UserService} from "@/services/UserService.ts";

type AuthContextValue = {
    authUser: Auth;
    logout: () => Promise<void>;
    loggingOut: boolean;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({children}) => {

    const {loading, user, authError, notAuthorized} = useAuth();
    const [loggedOut, setLoggedOut] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const logout = useCallback(async () => {
        setLoggingOut(true);
        try {
            const userService = new UserService();
            await userService.logout();

            localStorage.removeItem("tokenExpirationDate");
            setLoggedOut(true);
        } catch (error) {
            console.log(error);
        } finally {
            setLoggingOut(false);
        }
    }, []);

    const value = useMemo<AuthContextValue>(() => ({
        authUser: loggedOut
            ? {loading: false, user: undefined, authError: undefined, notAuthorized: true}
            : {loading, user, authError, notAuthorized},
        logout,
        loggingOut,
    }), [loading, user, authError, notAuthorized, loggedOut, logout, loggingOut]);

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
