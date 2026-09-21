import {useState, ChangeEvent} from "react";
import {Response} from "../type/response/Response.ts";
import {ErrorResponse} from "../type/response/ErrorResponse.ts";
import {UserResponse} from "../type/response/UserResponse.ts";
import {Link, Navigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {FieldErrorResponse} from "@/type/response/FieldErrorResponse.ts";
import {
    AlertDialog,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {UserService} from "@/services/UserService.ts";
import {Spinner} from "@/components/ui/spinner.tsx";
import {redirectTo} from "@/utils/redirectUtil.ts";
import ErrorMessageBox from "@/components/ErrorMessageBox.tsx";
import {fieldErrorHandler} from "@/utils/errorHandler.ts";


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
            fieldErrorHandler(error, setError);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    if (user?.status === 200) {
        return <Navigate to={redirectTo(user.data?.role, "/panel")} replace/>
    }

    return (
        <div>
            <div className="form-container">
                <div className="w-sm">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">Увійти</h3>
                    {error !== undefined && error.status === 404 ?
                        <ErrorMessageBox
                            error={error}
                        />
                        : <></>
                    }
                    {error !== undefined && error.status === 400 ?
                        <ErrorMessageBox
                            error={error}
                        />
                        : <></>
                    }
                    <form className="flex flex-col gap-3 mt-4" onSubmit={login}>
                        <Input
                            type="text"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-12"
                            disabled={loading}
                        />
                        <Input
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-12"
                            disabled={loading}
                            autoComplete="off"
                        />
                        <Button className="h-11 cursor-pointer" disabled={loading}>{loading ? <Spinner data-icon="inline-start" /> : "Увійти"}</Button>
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