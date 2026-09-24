import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {Response} from "@/type/response/Response.ts";
import {ErrorResponse} from "@/type/response/ErrorResponse.ts";
import {FieldErrorResponse} from "@/type/response/FieldErrorResponse.ts";

const ServerErrorDialog = ({error}: {error: Response<ErrorResponse<string | FieldErrorResponse>> | Response<ErrorResponse<string>> | undefined}) => {
    return (
        <AlertDialog open={error?.status === 500}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-red-500">Помилка серверу</AlertDialogTitle>
                    <AlertDialogDescription>
                        <p>Перезавантажте сторінку або зверніться до администратора!</p>
                        <p className="text-black mt-3">MSID: {error?.data.msid}</p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ServerErrorDialog;