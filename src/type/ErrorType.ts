import {Response} from "@/type/response/Response.ts";
import {ErrorResponse} from "@/type/response/ErrorResponse.ts";
import {FieldErrorResponse} from "@/type/response/FieldErrorResponse.ts";

export type ErrorType = {
    code: string | undefined,
    status: number | undefined,
    errorBody: Response<ErrorResponse<string>> | Response<ErrorResponse<string | FieldErrorResponse>> | undefined
};