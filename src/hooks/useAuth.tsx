import {useEffect, useState} from "react";
import {UserService} from "@/services/UserService.ts";
import {Response} from "@/type/response/Response.ts";
import {ErrorResponse} from "@/type/response/ErrorResponse.ts";
import {baseErrorHandler} from "@/utils/errorHandler.ts";
import {UserResponse} from "@/type/response/UserResponse.ts";

const useAuth = () => {

    const [user, setUser] = useState<Response<UserResponse> | undefined>(undefined);
    const [authError, setAuthError] = useState<Response<ErrorResponse<string>> | undefined>(undefined);
    const [loadingUser, setLoadingUser] = useState<boolean>(true);

    useEffect(() => {
        const userService = new UserService();
        userService.getAuthUser()
            .then(user => setUser(user))
            .catch(error => {
                baseErrorHandler(error, setAuthError);
                console.log(error);
            })
            .finally(() => setLoadingUser(false));
    }, []);

    return {
        loadingUser,
        user,
        authError,
        notAuthorized: authError?.status === 401
    };
};

export default useAuth;