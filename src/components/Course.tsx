import {Skeleton} from "@/components/ui/skeleton.tsx";
import Module from "@/components/Module.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {CourseService} from "@/services/CourseService.ts";
import {useEffect, useState} from "react";
import {baseErrorHandler} from "@/utils/errorHandler.ts";
import {Response} from "@/type/response/Response.ts";
import {ErrorResponse} from "@/type/response/ErrorResponse.ts";
import {CourseModel} from "@/type/model/CourseModel.ts";

const Course = ({courseId}: {courseId: string | undefined}) => {

    const [course, setCourse] = useState<Response<CourseModel> | undefined>(undefined);
    const [loadingCourse, setLoadingCourse] = useState<boolean>(true);
    const [_, setError] = useState<Response<ErrorResponse<string>> | undefined>(undefined);

    const loadCourse = async (courseId: string | undefined) => {
        if (courseId === undefined) return;

        try {
            const courseService = new CourseService();

            const response = await courseService.getCourseByIdWithUserStat(courseId);

            setCourse(response);
        } catch (error) {
            baseErrorHandler(error, setError);
            console.log(error);
        } finally {
            setLoadingCourse(false);
        }
    }

    useEffect(() => {

        loadCourse(courseId).then();

    }, []);


    return (
        <div className="flex flex-col h-screen items-center gap-5 justify-center">
            <div>
                {loadingCourse ?
                    <Skeleton className="w-40 h-6"/>
                    :
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{course?.data.name}</h3>
                }
            </div>
            {loadingCourse ?
                <div className="flex gap-6 flex-wrap justify-center">
                    {Array.from({length: 3}, (_, i) => i).map((i) => (
                        <Skeleton key={i} className="w-[410px] h-80 rounded-lg"/>
                    ))}
                </div>
                :
                <div className="flex gap-6 flex-wrap justify-center">
                    {course?.data?.modules.map((module) => (
                        <Module
                            module={module}
                            key={module.id}
                        />
                    ))}
                </div>
            }
            <Button asChild variant="link" className="p-0">
                <Link to="/panel" replace>До особистого кабінету</Link>
            </Button>
        </div>
    );
};

export default Course;