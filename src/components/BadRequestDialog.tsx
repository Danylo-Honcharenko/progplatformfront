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

const BadRequestDialog = ({error}: {error: Response<ErrorResponse<string>> | undefined}) => {
    const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);

    useEffect(() => {
        setOpenErrorDialog(error?.status === 400);
    }, [error]);

    return (
        <AlertDialog open={openErrorDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Помилка</AlertDialogTitle>
                    <AlertDialogDescription>
                        {typeof error?.data.details === "string" ? error?.data.details : "Невідома помилка!"}
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