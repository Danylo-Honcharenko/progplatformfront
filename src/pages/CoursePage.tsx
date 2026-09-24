import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link, Navigate, useParams} from "react-router-dom";
import {CourseService} from "@/services/CourseService.ts";
import {useEffect, useState} from "react";
import {baseErrorHandler} from "@/utils/errorHandler.ts";
import {Response} from "@/type/response/Response.ts";
import {ErrorResponse} from "@/type/response/ErrorResponse.ts";
import {CourseModel} from "@/type/model/CourseModel.ts";
import {ModuleService} from "@/services/ModuleService.ts";
import Module from "@/components/Module.tsx";
import {ModuleModel} from "@/type/model/ModuleModel.ts";
import useAuth from "@/hooks/useAuth.tsx";
import ServerErrorDialog from "@/components/ServerErrorDialog.tsx";

const CoursePage = () => {

    const [course, setCourse] = useState<CourseModel | undefined>(undefined);
    const [modules, setModules] = useState<ModuleModel[]>([]);
    const [loadingCourse, setLoadingCourse] = useState<boolean>(true);
    const [error, setError] = useState<Response<ErrorResponse<string>> | undefined>(undefined);

    const {notAuthorized} = useAuth();

    let {courseId} = useParams();

    const loadCourse = async (courseId: string | undefined) => {
        if (courseId === undefined) return;

        try {
            const courseService = new CourseService();
            const moduleService = new ModuleService();

            const response = await Promise.all([
                await courseService.getCourseById(courseId),
                await moduleService.getModulesByCourseId(courseId)
            ]);

            setCourse(response[0].data);
            setModules(response[1].data.modules);
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

    if (notAuthorized) return <Navigate to="/login" replace/>

    return (
        <>
            <div className="flex flex-col h-screen items-center gap-5 justify-center">
                <div>
                    {loadingCourse ?
                        <Skeleton className="w-40 h-6"/>
                        :
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{course?.name}</h3>
                    }
                </div>
                {loadingCourse ?
                    <div className="flex gap-6 flex-wrap justify-center">
                        {Array.from({length: 3}, (_, i) => i)
                            .map((i) => (
                            <Skeleton key={i} className="w-[410px] h-80 rounded-lg"/>
                        ))}
                    </div>
                    :
                    <div className="flex gap-6 flex-wrap justify-center">
                        {modules.map((module) => (
                            <Module
                                module={module}
                                key={module.id}
                                courseId={courseId}
                            />
                        ))}
                    </div>
                }
                <Button asChild variant="link" className="p-0">
                    <Link to="/panel" replace>До особистого кабінету</Link>
                </Button>
            </div>

            <ServerErrorDialog
                error={error}
            />

        </>
    );
};

export default CoursePage;