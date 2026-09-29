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

type Error = Response<ErrorResponse<string | FieldErrorResponse | undefined>> | Response<ErrorResponse<string> | undefined> | undefined;

type Props = {
    error: Error[]
};

const ServerErrorDialog = ({error}: Props) => {

    return (
        <AlertDialog open={error.length != 0}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-red-500">Помилка серверу</AlertDialogTitle>
                    <AlertDialogDescription>
                        <p>Перезавантажте сторінку або зверніться до администратора!</p>
                        <p className="text-black mt-3">MSID: {error[0]?.data?.msid}</p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ServerErrorDialog;