import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Response} from "@/type/response/Response.ts";
import {ErrorResponse} from "@/type/response/ErrorResponse.ts";
import {useEffect, useState} from "react";

type Error = Response<ErrorResponse<string>> | undefined;

type Props = {
    error: Error[]
};

const BadRequestDialog = ({error}: Props) => {
    const [currentError, setCurrentError] = useState<Error>();
    const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);

    useEffect(() => {
        if (error === undefined) return;
        const badRequestErrors = error?.filter((err) => err?.status === 400);
        if (badRequestErrors.length != 0) {
            setOpenErrorDialog(true);
            setCurrentError(badRequestErrors[0]);
        }
    }, [error]);

    return (
        <AlertDialog open={openErrorDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Помилка</AlertDialogTitle>
                    <AlertDialogDescription>
                        {typeof currentError?.data?.details === "string" ? currentError?.data.details : "Невідома помилка!"}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => setOpenErrorDialog(false)}
                    >Закрити</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default BadRequestDialog;