import {axiosInstance} from "@/config/axios.ts";
import {Response} from "@/type/response/Response.ts";
import {CreateModulStateResponse} from "@/type/response/CreateModulStateResponse.ts";
import {ModulesResponse} from "@/type/response/ModelsResponse.ts";

export class ModuleService {
    getModulesByCourseId = async (courseId: string): Promise<Response<ModulesResponse>> => {
        try {
            const response = await axiosInstance.get(`/module/get?courseId=${courseId}`, {withCredentials: true});
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    setCompletedTopic = async (moduleId: number | undefined, topicId: number, userId: number | undefined): Promise<Response<CreateModulStateResponse>> => {
        try {
            const request = {
                moduleId: moduleId,
                topicId: topicId,
                userId: userId
            };

            const response = await axiosInstance.post("/module/setCompletedTopic", request);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}