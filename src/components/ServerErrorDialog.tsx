import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";

const ServerErrorDialog = () => {

    return (
        <AlertDialog open={true}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Помилка серверу</AlertDialogTitle>
                    <AlertDialogDescription>
                        Перезавантажте сторінку або зверніться до администратора!
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ServerErrorDialog;