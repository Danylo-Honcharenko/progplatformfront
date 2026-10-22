import {CourseService} from "@/services/CourseService.ts";
import useRequest from "@/hooks/useRequest.tsx";

const useCourse = (courseId: string | undefined, enabled = true) => {

    const {data, error, loading} = useRequest(
        () => new CourseService().getCourseById(courseId!),
        [courseId],
        enabled && !!courseId
    );

    return {
        course: data?.data,
        courseError: error,
        loadingCourse: loading
    };
};

export default useCourse;
