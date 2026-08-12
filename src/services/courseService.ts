import {axiosInstance} from "@/config/axios.ts";

export const courseService = {
    getCourseByIdAndStaticByUserId: (courseId: string | undefined, userId: number) => axiosInstance.get(`/course/get?courseId=${courseId}&userId=${userId}`),
    getUserCourses: () => axiosInstance.get("/course/getUserCourse", {withCredentials: true})
}