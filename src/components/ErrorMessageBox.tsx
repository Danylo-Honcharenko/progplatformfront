import {AlertCircle} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {Response} from "@/type/response/Response.ts";
import {ErrorResponse} from "@/type/response/ErrorResponse.ts";
import {FieldErrorResponse} from "@/type/response/FieldErrorResponse.ts";

type Props = {
    error: Response<ErrorResponse<string | FieldErrorResponse>> | undefined
}

const ErrorMessageBox = ({error}: Props) => {

    const getErrorMessage = () => {
        if (typeof error?.data.details === "string") {
            return <p>{error?.data.details}</p>;
        } else if (typeof error?.data.details === "object") {
            return <>
                <p>{error?.data.details.password}</p>
                <p>{error?.data.details.email}</p>
            </>;
        } else {
            return <p>Невідома помилка!</p>;
        }
    }

    return (
        <Alert variant="destructive" className="mt-4 border-red-500">
            <AlertCircle className="h-4 w-4"/>
            <AlertTitle>Помилка</AlertTitle>
            <AlertDescription className="flex flex-col gap-0.5">
                {getErrorMessage()}
            </AlertDescription>
        </Alert>
    );
};

export default ErrorMessageBox;