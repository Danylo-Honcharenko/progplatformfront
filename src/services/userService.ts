import {axiosInstance} from "@/config/axios.ts";

export const userService = {
    login: (email: string, password: string) => axiosInstance.post('/user/login', {email: email, password: password}, {withCredentials: true}),
    checkIsAuthUser: () => axiosInstance.get("/user/auth/me", {withCredentials: true}),
    logout: () => axiosInstance.post("/user/logout", {}, {withCredentials: true}),
    registration: (firstName: string, lastName: string, email: string, password: string) => axiosInstance.post('/user/registration', {firstName: firstName, lastName: lastName, email: email, password: password})
}