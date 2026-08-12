import {axiosInstance} from "@/config/axios.ts";
import {AnswerResponse} from "@/type/response/AnswerResponse.ts";

export const testService = {
    checkTest: (testUUID: string, userId: number | undefined, answers: AnswerResponse[]) => axiosInstance.post("/test/check", {uuid: testUUID, userId: userId, answers: answers}, {withCredentials: true}),
    getTestResults: () => axiosInstance.get("/test/getTestsResults", {withCredentials: true})
}