import {Link} from "react-router-dom";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {RegisterRequest, UserService} from "@/services/UserService.ts";
import {Spinner} from "@/components/ui/spinner.tsx";
import {parsFieldError} from "@/utils/errorParser.ts";
import {ErrorType} from "@/type/ErrorType.ts";
import ErrorDialog from "@/components/ErrorDialog.tsx";
import {useFormik} from "formik";
import {Field, FieldDescription, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {registrationValidationSchema} from "@/validationSchemas/registrationValidationSchema.ts";

const Registration = () => {
    const [statusCode, setStatusCode] = useState<number>(0);
    const [error, setError] = useState<ErrorType | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const registration = async (values: RegisterRequest) => {
        setLoading(true);

        try {
            const userService = new UserService();
            const status = await userService.registration(values);
            setStatusCode(status);
        } catch (error) {
            const parsedError = parsFieldError(error);
            setError(parsedError);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        },
        validationSchema: registrationValidationSchema,
        onSubmit: registration
    });

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

    const firstNameValid: boolean = formik.touched.firstName !== undefined && formik.errors.firstName !== undefined;
    const lastNameValid: boolean = formik.touched.lastName !== undefined && formik.errors.lastName !== undefined;
    const emailValid: boolean = formik.touched.email !== undefined && formik.errors.email !== undefined;
    const passwordValid: boolean = formik.touched.password !== undefined && formik.errors.password !== undefined;

    return (
        <div>
            <div className="form-container">
                <div className="mx-auto w-full max-w-sm px-4">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">Реєстрація</h3>
                    <form className="mt-3" onSubmit={formik.handleSubmit}>
                        <FieldGroup className="gap-4">
                            <Field data-invalid={firstNameValid} >
                                {firstNameValid ?
                                    <FieldLabel htmlFor="firstName">Неприпустимі вхідні дані</FieldLabel>
                                    :
                                    null
                                }
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    placeholder="Ім'я"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="h-12"
                                    disabled={loading}
                                    aria-invalid={firstNameValid}
                                />
                                {firstNameValid ?
                                    <FieldDescription>
                                        {formik.errors.firstName}
                                    </FieldDescription>
                                    :
                                    null
                                }
                            </Field>
                            <Field data-invalid={lastNameValid}>
                                {lastNameValid ?
                                    <FieldLabel htmlFor="lastName">Неприпустимі вхідні дані</FieldLabel>
                                    : null
                                }
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder="Прізвище"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="h-12"
                                    disabled={loading}
                                    aria-invalid={lastNameValid}
                                />
                                {lastNameValid ? <FieldDescription>{formik.errors.lastName}</FieldDescription> : null}
                            </Field>
                            <Field data-invalid={emailValid}>
                                {emailValid ?
                                    <FieldLabel htmlFor="email">Неприпустимі вхідні дані</FieldLabel>
                                    : null
                                }
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="E-mail"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="h-12"
                                    disabled={loading}
                                    aria-invalid={emailValid}
                                />
                                {emailValid ? <FieldDescription>{formik.errors.email}</FieldDescription> : null}
                            </Field>
                            <Field data-invalid={passwordValid}>
                                {passwordValid ?
                                    <FieldLabel htmlFor="password">Неприпустимі вхідні дані</FieldLabel>
                                    : null
                                }
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Пароль"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="h-12"
                                    disabled={loading}
                                    autoComplete="off"
                                    aria-invalid={passwordValid}
                                />
                                {passwordValid ? <FieldDescription>{formik.errors.password}</FieldDescription> : null}
                            </Field>
                            <Field>
                                <Button type="submit" className="h-11 cursor-pointer" disabled={loading}>{loading ? <Spinner data-icon="inline-start" /> : "Зареєструватись"}</Button>
                            </Field>
                        </FieldGroup>
                    </form>
                    <div className="mt-3 text-center">
                        <p className="text-gray-400">Вже маєте акаунт?</p>
                        <Button asChild variant="link"><Link to="/login" replace>Увійти</Link></Button>
                    </div>
                </div>
            </div>

            <ErrorDialog
                errors={[error]}
            />

        </div>
    );
};

export default Registration;
