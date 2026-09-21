import {useEffect, useState} from "react";
import {CourseService} from "@/services/CourseService.ts";
import {Response} from "@/type/response/Response.ts";
import {ErrorResponse} from "@/type/response/ErrorResponse.ts";
import {baseErrorHandler} from "@/utils/errorHandler.ts";
import {CoursesResponse} from "@/type/response/CoursesResponse.ts";

const useCourses = () => {

    const [courses, setCourses] = useState<Response<CoursesResponse> | undefined>(undefined);
    const [loadingCourses, setLoadingCourses] = useState<boolean>(true);
    const [courseError, setCourseError] = useState<Response<ErrorResponse<string>> | undefined>(undefined);

    useEffect(() => {
        const courseService = new CourseService();
        courseService.getUserCourses()
            .then((courses) => setCourses(courses))
            .catch((error) => {
                baseErrorHandler(error, setCourseError);
                console.log(error);
            })
            .finally(() => setLoadingCourses(false));
    }, []);

    return {
        loadingCourses,
        courseError,
        courses
    };
};

export default useCourses;