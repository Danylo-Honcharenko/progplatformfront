import {Link} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import {Response} from "../type/response/Response.ts";
import {UserResponse} from "../type/response/UserResponse.ts";
import {ErrorResponse} from "../type/response/ErrorResponse.ts";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {AlertCircle} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {FieldErrorResponse} from "@/type/response/FieldErrorResponse.ts";
import {userService} from "@/services/userService.ts";

const Registration = () => {
    const [user, setUser] = useState<Response<UserResponse> | undefined>(undefined);
    const [error, setError] = useState<Response<ErrorResponse<string | FieldErrorResponse>> | undefined>(undefined);
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const registration = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);

        userService.registration(firstName, lastName, email, password)
            .then((res) => setUser(res.data))
            .then(() => setLoading(false))
            .catch((err) => setError(err.response.data));
    }

    useEffect(() => {
        if (error !== undefined) {
            setLoading(false);
        }
    }, [error]);

    useEffect(() => {
        if (user !== undefined && user.status === 201) {
            setLoading(false);
        }
    }, []);

    if (user?.status === 201) {
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
            {loading ?
                <div className="text-center p-3 bg-black text-white absolute w-full">
                    <p>Завантаження...</p>
                </div>
                :
                <></>
            }
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
                        <Button className="h-11 cursor-pointer" disabled={loading}>Зареєструватись</Button>
                    </form>
                    <div className="mt-3 text-center">
                        <p className="text-gray-400">Вже маєте акаунт?</p>
                        <Button asChild variant="link"><Link to="/login" replace>Увійти</Link></Button>
                    </div>
                    {error !== undefined && typeof error?.data.details === "string" && error.status === 500 ?
                        <Alert variant="destructive" className="mt-4 border-red-500">
                            <AlertCircle className="h-4 w-4"/>
                            <AlertTitle>Помилка</AlertTitle>
                            <AlertDescription>
                                {error?.data.details}
                            </AlertDescription>
                        </Alert>
                        : <></>
                    }
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

export default Registration;