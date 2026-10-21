import {axiosInstance} from "@/config/axios.ts";
import {Response} from "@/type/response/Response.ts";
import {UserResponse} from "@/type/response/UserResponse.ts";
import {LoginRequest} from "@/type/request/LoginRequest.ts";
import {RegisterRequest} from "@/type/request/RegisterRequest.ts";

export class UserService {

    async login(request: LoginRequest): Promise<Response<UserResponse>> {
        try {
            const response = await axiosInstance.post<Response<UserResponse>>('/user/login', request, {withCredentials: true});
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async registration(request: RegisterRequest) {
        try {
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
