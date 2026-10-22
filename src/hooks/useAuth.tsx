import {UserService} from "@/services/UserService.ts";
import {Response} from "@/type/response/Response.ts";
import {UserResponse} from "@/type/response/UserResponse.ts";
import {ErrorType} from "@/type/ErrorType.ts";
import useRequest from "@/hooks/useRequest.tsx";

export type Auth = {
    loading: boolean;
    user: Response<UserResponse> | undefined;
    authError: ErrorType | undefined;
    notAuthorized: boolean;
};

const useAuth = (): Auth => {

    const {data, error, loading} = useRequest(
        () => new UserService().getAuthUser(),
        []
    );

    return {
        loading,
        user: data,
        authError: error,
        notAuthorized: error?.status === 401
    };
};

export default useAuth;
