import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {DialogProps} from "@/props/Props.ts";

const ServerErrorDialog = ({open, onClose}: DialogProps) => {

    return (
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Помилка серверу</AlertDialogTitle>
                    <AlertDialogDescription>
                        Сервер не зміг обробити запит. Перезавантажте сторінку або спробуйте ще раз!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button
                        variant="outline"
                        className="cursor-pointer"
                        onClick={onClose}
                    >Закрити</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ServerErrorDialog;