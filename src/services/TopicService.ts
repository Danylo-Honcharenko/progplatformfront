import {axiosInstance} from "@/config/axios.ts";
import {Response} from "@/type/response/Response.ts";
import {Topics} from "@/type/model/TopicsModel.ts";

export class TopicService {
    getTopicsByModuleId = async (moduleId: string): Promise<Response<Topics>> => {
        try {
            const response = await axiosInstance.get(`/topic/getAllModuleTopics?moduleId=${moduleId}`, {withCredentials: true});
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}