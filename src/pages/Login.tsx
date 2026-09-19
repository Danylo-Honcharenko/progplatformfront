import {useState, ChangeEvent} from "react";
import {Response} from "../type/response/Response.ts";
import {ErrorResponse} from "../type/response/ErrorResponse.ts";
import {UserResponse} from "../type/response/UserResponse.ts";
import {Link, Navigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircle} from "lucide-react";
import {FieldErrorResponse} from "@/type/response/FieldErrorResponse.ts";
import {
    AlertDialog,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {UserService} from "@/services/UserService.ts";


const Login = () => {

    const [user, setUser] = useState<Response<UserResponse> | undefined>(undefined);
    const [error, setError] = useState<Response<ErrorResponse<string | FieldErrorResponse>> | undefined>(undefined);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const login = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            const userService = new UserService();
            const response = await userService.login(email, password);

            setUser(response.data);
        } catch (error) {
            setError(error as Response<ErrorResponse<string>>);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    if (user !== undefined && user.status === 200 && user.data.role === "ROLE_USER") {
        return <Navigate to="/user" replace/>
    }

    if (user !== undefined && user.status === 200 && user.data.role === "ROLE_ADMIN") {
        return <Navigate to="/user" replace />
    }

    const isBadRequestPasswordError = error !== undefined && error.status === 400 && typeof error?.data.details === "string";
    const isUserNotFound = error !== undefined && error.status === 404;

    return (
        <div>
            {loading ?
                <div className="text-center p-3 bg-black text-white absolute w-full">
                    <p>Завантаження...</p>
                </div>
                :
                <></>
            }
            <div className="form-container">
                <div className="w-sm">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">Увійти</h3>
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
                    <form className="flex flex-col gap-3 mt-4" onSubmit={login}>
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
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={isBadRequestPasswordError ? "border-red-500 h-12" : "h-12"}
                            disabled={loading}
                        />
                        <Button className="h-11 cursor-pointer" disabled={loading}>Увійти</Button>
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
                    <div className="mt-3 text-center">
                        <div>
                            <p className="text-gray-400">Ще не маєте облікового запису?</p>
                            <Button asChild variant="link"><Link to="/registration" replace>Створити обліковий запис</Link></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Login;