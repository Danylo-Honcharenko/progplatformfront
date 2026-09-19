import {axiosInstance} from "@/config/axios.ts";
import {Response} from "@/type/response/Response.ts";
import {CreateModulStateResponse} from "@/type/response/CreateModulStateResponse.ts";

export class ModuleService {
    setCompletedTopic = async (moduleId: number | undefined, topicId: number, userId: number | undefined): Promise<Response<CreateModulStateResponse>> => {
        try {
            const response = await axiosInstance.post("/module/setCompletedTopic", {moduleId: moduleId, topicId: topicId, userId: userId});
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}