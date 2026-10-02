import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {DialogProps} from "@/props/Props.ts";

const NotAuthorizedDialog = ({open}: DialogProps) => {

    return (
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Помилка авторизації</AlertDialogTitle>
                    <AlertDialogDescription>
                        Виконайте вхід у систему
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Link to="/login">
                        <Button
                            className="cursor-pointer"
                        >Увійти</Button>
                    </Link>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default NotAuthorizedDialog;