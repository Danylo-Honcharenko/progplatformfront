import {FieldErrorResponse} from "@/type/response/FieldErrorResponse.ts";
import {ErrorResponse} from "@/type/response/ErrorResponse.ts";
import {Response} from "../type/response/Response.ts";
import axios, {AxiosError} from "axios";
import {ErrorType} from "@/type/ErrorType.ts";

const parsError = (error: unknown): ErrorType => {
    if (axios.isAxiosError(error)) {
        const axiosError = (error as AxiosError);
        const errorBody = axiosError.response?.data as Response<ErrorResponse<string>>;

        return {
            code: axiosError.code,
            status: axiosError.status,
            errorBody: errorBody
        };
    } else {
        throw error;
    }
}

const parsFieldError = (error: unknown): ErrorType => {
    if (axios.isAxiosError(error)) {
        const axiosError = (error as AxiosError);
        const errorBody = axiosError.response?.data as Response<ErrorResponse<string | FieldErrorResponse>>;

        return {
            code: axiosError.code,
            status: axiosError.status,
            errorBody: errorBody
        };
    } else {
        throw error;
    }
}

export {
    parsError,
    parsFieldError
};