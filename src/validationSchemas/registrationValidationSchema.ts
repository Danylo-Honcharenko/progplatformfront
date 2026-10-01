import * as Yup from "yup";

export const registrationValidationSchema = Yup.object({
    firstName: Yup.string()
        .required('Ім’я не має бути пустим!'),
    lastName: Yup.string()
        .required('Прізвище не має бути пустим!'),
    email: Yup.string()
        .email("Email повинен містити @")
        .required('Email не має бути пустим!'),
    password: Yup.string()
        .required('Пароль не має бути пустим!')
});
