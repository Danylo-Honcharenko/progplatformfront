import {Link} from "react-router-dom";
import {ChangeEvent, useState} from "react";
import {Response} from "../type/response/Response.ts";
import {ErrorResponse} from "../type/response/ErrorResponse.ts";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {FieldErrorResponse} from "@/type/response/FieldErrorResponse.ts";
import {UserService} from "@/services/UserService.ts";
import ErrorMessageBox from "@/components/ErrorMessageBox.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";
import {fieldErrorHandler} from "@/utils/errorHandler.ts";
import ServerErrorDialog from "@/components/ServerErrorDialog.tsx";

const Registration = () => {
    const [statusCode, setStatusCode] = useState<number>(0);
    const [error, setError] = useState<Response<ErrorResponse<string | FieldErrorResponse>> | undefined>(undefined);
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const registration = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            const userService = new UserService();
            const status = await userService.registration(firstName, lastName, email, password);
            setStatusCode(status);
        } catch (error) {
            fieldErrorHandler(error, setError);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    if (statusCode === 201) {
        return (
            <div className="form-container">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">Тепер увійдіть щоб
                    розпочати</h3>
                <div className="mt-3 text-center">
                    <Button asChild variant="outline"><Link to="/login" replace>Увійти</Link></Button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="form-container">
                <div className="w-sm">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">Реєстрація</h3>
                    <form className="flex flex-col gap-3 mt-4" onSubmit={registration}>
                        <Input
                            type="text"
                            placeholder="Ім'я"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="h-12"
                            disabled={loading}
                        />
                        <Input
                            type="text"
                            placeholder="Фамілія"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="h-12"
                            disabled={loading}
                        />
                        <Input
                            type="text"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-12"
                            disabled={loading}
                        />
                        <Input
                            type="text"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-12"
                            disabled={loading}
                        />
                        <Button className="h-11 cursor-pointer" disabled={loading}>{loading ? <Spinner data-icon="inline-start" /> : "Зареєструватись"}</Button>
                    </form>
                    <div className="mt-3 text-center">
                        <p className="text-gray-400">Вже маєте акаунт?</p>
                        <Button asChild variant="link"><Link to="/login" replace>Увійти</Link></Button>
                    </div>
                    {error !== undefined && error.status === 400 ?
                        <ErrorMessageBox
                            error={error}
                        />
                        :
                        <></>
                    }
                </div>
            </div>

            <ServerErrorDialog
                error={error}
            />

        </div>
    );
};

export default Registration;