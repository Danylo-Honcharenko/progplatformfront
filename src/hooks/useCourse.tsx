import {useEffect, useState} from "react";
import {CourseService} from "@/services/CourseService.ts";
import {CourseModel} from "@/type/model/CourseModel.ts";
import {parsError} from "@/utils/errorParser.ts";
import {ErrorType} from "@/type/ErrorType.ts";


const useCourse = (courseId: string | undefined) => {

    const [course, setCourse] = useState<CourseModel | undefined>(undefined);
    const [error, setError] = useState<ErrorType | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        if (courseId === undefined) return;
        const courseService = new CourseService();
        courseService.getCourseById(courseId)
            .then((response) => setCourse(response.data))
            .catch((error) => {
                const parsedError = parsError(error);
                setError(parsedError);
            })
            .finally(() => setLoading(false));
    }, [courseId]);

    return {
        course,
        courseError: error,
        loadingCourse: loading
    };
};

export default useCourse;