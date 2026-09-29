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
import {useEffect, useState} from "react";

type Error = Response<ErrorResponse<string | FieldErrorResponse | undefined>> | Response<ErrorResponse<string>> | undefined;

type Props = {
    error: Error[]
};

const ServerErrorDialog = ({error}: Props) => {

    const [currentError, setCurrentError] = useState<Error>();
    const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);

    useEffect(() => {
        if (error === undefined) return;
        const serverErrors = error?.filter((err) => err?.status === 500);
        if (serverErrors.length != 0) {
            setOpenErrorDialog(true);
            setCurrentError(serverErrors[0]);
        }
    }, [error]);

    return (
        <AlertDialog open={openErrorDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-red-500">Помилка серверу</AlertDialogTitle>
                    <AlertDialogDescription>
                        <p>Перезавантажте сторінку або зверніться до администратора!</p>
                        <p className="text-black mt-3">MSID: {currentError?.data.msid}</p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ServerErrorDialog;