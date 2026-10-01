import {useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {LoginRequest, LoginResponse, UserService} from "@/services/UserService.ts";
import {Spinner} from "@/components/ui/spinner.tsx";
import {redirectTo} from "@/utils/redirectUtil.ts";
import {parsFieldError} from "@/utils/errorParser.ts";
import {ErrorType} from "@/type/ErrorType.ts";
import ErrorDialog from "@/components/ErrorDialog.tsx";
import {useFormik} from "formik";
import {Field, FieldDescription, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {loginValidationSchema} from "@/validationSchemas/loginValidationSchema.ts";
import {Checkbox} from "@/components/ui/checkbox.tsx";

const Login = () => {

    const [user, setUser] = useState<LoginResponse | undefined>(undefined);
    const [error, setError] = useState<ErrorType | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const login = async (values: LoginRequest) => {
        setLoading(true);

        try {
            const userService = new UserService();
            const response = await userService.login(values);

            setUser(response.data);
            localStorage.setItem("tokenExpirationDate", response.data.tokenExpirationDate);
        } catch (error) {
            const handleError = parsFieldError(error);
            setError(handleError);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginValidationSchema,
        onSubmit: login
    });

    if (user) {
        return <Navigate to={redirectTo(user.role, "/panel")} replace/>
    }

    const emailValid: boolean = formik.touched.email !== undefined && formik.errors.email !== undefined;
    const passwordValid: boolean = formik.touched.password !== undefined && formik.errors.password !== undefined;

    return (
        <div>
            <div className="form-container">
                <div className="mx-auto w-full max-w-sm px-4">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">Увійти</h3>
                    <form className="mt-3" onSubmit={formik.handleSubmit}>
                        <FieldGroup className="gap-4">
                            <Field data-invalid={emailValid} >
                                {emailValid ?
                                    <FieldLabel htmlFor="email">Неприпустимі вхідні дані</FieldLabel>
                                    :
                                    null
                                }
                                <Input
                                    id="email"
                                    type="text"
                                    placeholder="E-mail"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    className="h-12"
                                    disabled={loading}
                                    aria-invalid={emailValid}
                                />
                                {emailValid ? <FieldDescription>{formik.errors.email}</FieldDescription> : null}
                            </Field>
                            <Field data-invalid={passwordValid}>
                                {passwordValid ?
                                    <FieldLabel htmlFor="password">Неприпустимі вхідні дані</FieldLabel>
                                    :
                                    null
                                }
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Пароль"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    className="h-12"
                                    disabled={loading}
                                    autoComplete="off"
                                    aria-invalid={passwordValid}
                                />
                                {passwordValid ? <FieldDescription>{formik.errors.password}</FieldDescription> : null}
                            </Field>
                            <Field orientation="horizontal">
                                <Checkbox
                                    id="show-password"
                                    name="show-password"
                                    checked={showPassword}
                                    onCheckedChange={() => setShowPassword(!showPassword)}
                                />
                                <FieldLabel htmlFor="show-password">Показати пароль</FieldLabel>
                            </Field>
                            <Field>
                                <Button type="submit" className="h-11 cursor-pointer" disabled={loading}>{loading ? <Spinner data-icon="inline-start" /> : "Увійти"}</Button>
                            </Field>
                        </FieldGroup>
                    </form>
                    <div className="mt-3 text-center">
                        <div>
                            <p className="text-gray-400">Ще не маєте облікового запису?</p>
                            <Button asChild variant="link"><Link to="/registration" replace>Створити обліковий запис</Link></Button>
                        </div>
                    </div>
                </div>
            </div>

            <ErrorDialog
                errors={[error]}
            />

        </div>
    );
};


export default Login;
