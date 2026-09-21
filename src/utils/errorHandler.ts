import {Dispatch, SetStateAction} from "react";
import {FieldErrorResponse} from "@/type/response/FieldErrorResponse.ts";
import {ErrorResponse} from "@/type/response/ErrorResponse.ts";
import {Response} from "../type/response/Response.ts";
import axios, {AxiosError} from "axios";

const baseErrorHandler = (error: unknown, setError: Dispatch<SetStateAction<Response<ErrorResponse<string>> | undefined>>) => {
    if (axios.isAxiosError(error)) {
        const err = (error as AxiosError).response?.data as Response<ErrorResponse<string>>;
        setError(err);
    } else {
        throw error;
    }
}

const fieldErrorHandler = (error: unknown, setError: Dispatch<SetStateAction<Response<ErrorResponse<string | FieldErrorResponse>> | undefined>>) => {
    if (axios.isAxiosError(error)) {
        const err = (error as AxiosError).response?.data as Response<ErrorResponse<string | FieldErrorResponse>>;
        setError(err);
    } else {
        throw error;
    }
}

export {baseErrorHandler, fieldErrorHandler};