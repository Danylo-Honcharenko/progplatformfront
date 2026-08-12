import {axiosInstance} from "@/config/axios.ts";

export const moduleService = {
    setCompletedTopic: (moduleId: number, topicId: number, userId: number | undefined) => axiosInstance.post("/module/setCompletedTopic", {moduleId: moduleId, topicId: topicId, userId: userId})
}