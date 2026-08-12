import {ChangeEvent, useState} from "react";
import {Response} from "@/type/response/Response.ts";
import {ErrorResponse} from "@/type/response/ErrorResponse.ts";
import {FieldErrorResponse} from "@/type/response/FieldErrorResponse.ts";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircle} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";

const ChangePassword = () => {

    const [error, setError] = useState<Response<ErrorResponse<string | FieldErrorResponse>> | undefined>(undefined);
    const [email, setEmail] = useState<string>('');
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const changePassword = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
    }

    const isBadRequestPasswordError = error !== undefined && error.status === 400 && typeof error?.data.details === "string";
    const isUserNotFound = error !== undefined && error.status === 404;

    return (
        <div>
            <div className="form-container">
                <div className="w-sm">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">Змінити пароль</h3>
                    {isUserNotFound ?
                        <Alert variant="default" className="mt-4">
                            <AlertCircle className="h-4 w-4"/>
                            <AlertTitle>Повідомлення</AlertTitle>
                            <AlertDescription className="flex flex-col gap-0.5">
                                <p>{typeof error?.data.details === "string" ? error?.data.details : "Не вдалося відобразити повідомлення!"}</p>
                            </AlertDescription>
                        </Alert>
                        :
                        <></>
                    }
                    {isBadRequestPasswordError ?
                        <Alert variant="default" className="mt-4">
                            <AlertCircle className="h-4 w-4"/>
                            <AlertTitle>Повідомлення</AlertTitle>
                            <AlertDescription className="flex flex-col gap-0.5">
                                <p>{typeof error?.data.details === "string" ? error?.data.details : "Не вдалося відобразити повідомлення!"}</p>
                            </AlertDescription>
                        </Alert>
                        :
                        <></>
                    }
                    <form className="flex flex-col gap-3 mt-4" onSubmit={changePassword}>
                        <Input
                            type="text"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={isUserNotFound ? "border-red-500 h-12" : "h-12"}
                            disabled={loading}
                        />
                        <Input
                            type="password"
                            placeholder="Старий пароль"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className={isBadRequestPasswordError ? "border-red-500 h-12" : "h-12"}
                            disabled={loading}
                        />
                        <Input
                            type="password"
                            placeholder="Новий пароль"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={isBadRequestPasswordError ? "border-red-500 h-12" : "h-12"}
                            disabled={loading}
                        />
                        <Button className="h-11 cursor-pointer" disabled={loading}>Змінити</Button>
                    </form>
                    <AlertDialog open={error !== undefined && error.status === 500}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-red-500">Помилка серверу</AlertDialogTitle>
                                <AlertDialogDescription>
                                    <p>{typeof error?.data.details === "string" ? error?.data.details : "Не вдалося відобразити помилку!"}</p>
                                    <p className="text-black mt-3">MSID: {error?.data.msid}</p>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                        </AlertDialogContent>
                    </AlertDialog>
                    {error !== undefined && error.status === 400 && typeof error?.data.details === "object" ?
                        <Alert variant="destructive" className="mt-4 border-red-500">
                            <AlertCircle className="h-4 w-4"/>
                            <AlertTitle>Помилка валідації вхідних параметрів</AlertTitle>
                            <AlertDescription className="flex flex-col gap-0.5">
                                <p>{error?.data.details.password}</p>
                                <p>{error?.data.details.email}</p>
                            </AlertDescription>
                        </Alert>
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;