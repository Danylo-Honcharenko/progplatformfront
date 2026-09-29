import {useEffect, useState} from "react";
import {CourseService} from "@/services/CourseService.ts";
import {CourseModel} from "@/type/model/CourseModel.ts";
import {Response} from "@/type/response/Response.ts";
import {ErrorResponse} from "@/type/response/ErrorResponse.ts";
import {baseErrorHandler} from "@/utils/errorHandler.ts";


const useCourse = (courseId: string | undefined) => {

    const [course, setCourse] = useState<CourseModel | undefined>(undefined);
    const [error, setError] = useState<Response<ErrorResponse<string>> | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        if (courseId === undefined) return;
        const courseService = new CourseService();
        courseService.getCourseById(courseId)
            .then((response) => setCourse(response.data))
            .catch((error) => baseErrorHandler(error, setError))
            .finally(() => setLoading(false));
    }, []);

    return {
        course,
        courseError: error,
        loadingCourse: loading
    };
};

export default useCourse;