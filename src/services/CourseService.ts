import {axiosInstance} from "@/config/axios.ts";
import {Response} from "@/type/response/Response.ts";
import {CoursesResponse} from "@/type/response/CoursesResponse.ts";
import {CourseModel} from "@/type/model/CourseModel.ts";

export class CourseService {
    getCourseById = async (id: string): Promise<Response<CourseModel>> => {
        try {
            const response = await axiosInstance.get(`/course/${id}`, {withCredentials: true});
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    getUserCourses = async (): Promise<Response<CoursesResponse>> => {
        try {
            const response = await axiosInstance.get("/course/getUserCourse", {withCredentials: true});
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}