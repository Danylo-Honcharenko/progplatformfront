import {axiosInstance} from "@/config/axios.ts";
import {Response} from "@/type/response/Response.ts";
import {CourseModel} from "@/type/model/CourseModel.ts";
import {CoursesResponse} from "@/type/response/CoursesResponse.ts";

export class CourseService {
    getCourseByIdAndStaticByUserId = async (courseId: string | undefined): Promise<Response<CourseModel>> => {
        try {
            const response = await axiosInstance.get(`/course/${courseId}/user/stat`, {withCredentials: true});
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