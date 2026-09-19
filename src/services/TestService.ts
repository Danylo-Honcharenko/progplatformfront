import {axiosInstance} from "@/config/axios.ts";
import {AnswerResponse} from "@/type/response/AnswerResponse.ts";
import {Response} from "@/type/response/Response.ts";
import {TestResult, TestResultResponse} from "@/type/response/TestResultResponse.ts";

export class TestService {
    checkTest = async (testUUID: string, userId: number | undefined, answers: AnswerResponse[]): Promise<Response<TestResult>> => {
        try {
            const response = await axiosInstance.post("/test/check", {uuid: testUUID, userId: userId, answers: answers}, {withCredentials: true});
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    getTestResults = async (): Promise<Response<TestResultResponse>> => {
        try {
            const response = await axiosInstance.get("/test/getTestsResults", {withCredentials: true});
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}