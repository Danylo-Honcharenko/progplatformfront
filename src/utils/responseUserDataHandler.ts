import {Response} from "@/type/response/Response.ts";
import {UserResponse} from "@/type/response/UserResponse.ts";

type ExtractUserDataFunc = (data: Response<UserResponse>) => void;

export const responseUserDataHandler = (res: Response<UserResponse> | undefined, extractFunc: ExtractUserDataFunc) => {
    if (res !== undefined) {
        extractFunc(res);
    }
};