import {useEffect, useState} from "react";
import {CourseService} from "@/services/CourseService.ts";
import {Response} from "@/type/response/Response.ts";
import {parsError} from "@/utils/errorParser.ts";
import {CoursesResponse} from "@/type/response/CoursesResponse.ts";
import {ErrorType} from "@/type/ErrorType.ts";

const useCourses = () => {

    const [courses, setCourses] = useState<Response<CoursesResponse> | undefined>(undefined);
    const [loadingCourses, setLoadingCourses] = useState<boolean>(true);
    const [error, setError] = useState<ErrorType | undefined>(undefined);

    useEffect(() => {
        const courseService = new CourseService();
        courseService.getUserCourses()
            .then((courses) => setCourses(courses))
            .catch((error) => {
                const parsedError = parsError(error);
                setError(parsedError);
                console.log(error);
            })
            .finally(() => setLoadingCourses(false));
    }, []);

    return {
        loadingCourses,
        courseError: error,
        courses
    };
};

export default useCourses;