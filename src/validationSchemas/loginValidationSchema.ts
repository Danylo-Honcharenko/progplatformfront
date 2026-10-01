import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
    email: Yup.string()
        .email("Email повинен містити @")
        .required('Email не має бути пустим!'),
    password: Yup.string()
        .required('Пароль не має бути пустим!')
});
