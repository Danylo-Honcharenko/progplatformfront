import {axiosInstance} from "@/config/axios.ts";
import {Response} from "@/type/response/Response.ts";
import {UserResponse} from "@/type/response/UserResponse.ts";

export class UserService {

    async login(email: string, password: string) {
        try {
            const request = {
                email: email,
                password: password
            };

            return await axiosInstance.post('/user/login', request, {withCredentials: true});
        } catch (error) {
            throw error;
        }
    }

    async registration(firstName: string, lastName: string, email: string, password: string) {
        try {
            const request = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            };

            const response = await axiosInstance.post('/user/registration', request);
            return response.status;
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            return await axiosInstance.post("/user/logout", {}, {withCredentials: true});
        } catch (error) {
            throw error;
        }
    }

    async getAuthUser(): Promise<Response<UserResponse>> {
        try {
            const response = await axiosInstance.get("/user/auth/me", {withCredentials: true});
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}