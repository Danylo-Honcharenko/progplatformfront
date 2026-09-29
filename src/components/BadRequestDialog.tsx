import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";

const BadRequestDialog = () => {

    const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(true);

    return (
        <AlertDialog open={openErrorDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Помилка</AlertDialogTitle>
                    <AlertDialogDescription>
                        Не вдалось обробити запит! Спробуйте ще раз
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