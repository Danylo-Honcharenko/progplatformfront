import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link, Navigate, useParams} from "react-router-dom";
import Module from "@/components/Module.tsx";
import useAuth from "@/hooks/useAuth.tsx";
import ServerErrorDialog from "@/components/ServerErrorDialog.tsx";
import useCourse from "@/hooks/useCourse.tsx";
import useModule from "@/hooks/useModule.tsx";

const CoursePage = () => {

    const {notAuthorized} = useAuth();
    let {courseId} = useParams();

    const {loadingCourse, course, courseError} = useCourse(courseId);
    const {loadingModules, modules, modulesError} = useModule(courseId);

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
                {loadingModules ?
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
                error={[courseError, modulesError]}
            />

        </>
    );
};

export default CoursePage;