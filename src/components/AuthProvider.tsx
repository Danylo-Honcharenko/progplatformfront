import {createContext, FC, ReactNode} from "react";
import {Response} from "@/type/response/Response.ts";
import {UserResponse} from "@/type/response/UserResponse.ts";
import {ErrorType} from "@/type/ErrorType.ts";
import useAuth from "@/hooks/useAuth.tsx";

type AuthContext = {
    loadingUser: boolean;
    user: Response<UserResponse> | undefined;
    authError: ErrorType | undefined;
    notAuthorized: boolean;
};

export const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({children}) => {

    const authUser = useAuth();

    return (
        <AuthContext.Provider value={{...authUser}}>
            {children}
        </AuthContext.Provider>
    );
};