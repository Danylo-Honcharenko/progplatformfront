import {useEffect, useState} from "react";
import {UserService} from "@/services/UserService.ts";
import {Response} from "@/type/response/Response.ts";
import {parsError} from "@/utils/errorParser.ts";
import {UserResponse} from "@/type/response/UserResponse.ts";
import {ErrorType} from "@/type/ErrorType.ts";

export type Auth = {
    loading: boolean;
    user: Response<UserResponse> | undefined;
    authError: ErrorType | undefined;
    notAuthorized: boolean;
};

const useAuth = () => {

    const [user, setUser] = useState<Response<UserResponse> | undefined>(undefined);
    const [error, setError] = useState<ErrorType | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const userService = new UserService();
        userService.getAuthUser()
            .then(user => setUser(user))
            .catch(error => {
                const parsedError = parsError(error);
                setError(parsedError);
                console.log(error);
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        loading,
        user,
        authError: error,
        notAuthorized: error?.status === 401
    };
};

export default useAuth;