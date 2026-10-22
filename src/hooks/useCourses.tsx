import {CourseService} from "@/services/CourseService.ts";
import useRequest from "@/hooks/useRequest.tsx";

const useCourses = () => {

    const {data, error, loading} = useRequest(
        () => new CourseService().getUserCourses(),
        []
    );

    return {
        loadingCourses: loading,
        courseError: error,
        courses: data
    };
};

export default useCourses;
