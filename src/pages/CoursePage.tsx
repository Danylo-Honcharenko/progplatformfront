import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Navigate, useParams} from "react-router-dom";
import Module from "@/components/Module.tsx";
import useCourse from "@/hooks/useCourse.tsx";
import useModule from "@/hooks/useModule.tsx";
import ErrorDialog from "@/components/ErrorDialog.tsx";
import ContentErrorAlert from "@/components/ContentErrorAlert.tsx";
import {useContext} from "react";
import {AuthContext} from "@/components/AuthProvider.tsx";

const CoursePage = () => {

    const authContext = useContext(AuthContext);
    let {courseId} = useParams();

    const {loadingCourse, course, courseError} = useCourse(courseId);
    const {loadingModules, modules, modulesError} = useModule(courseId);

    if (authContext?.notAuthorized) return <Navigate to="/login" replace/>

    return (
        <>
            {courseError || modulesError ?
                <div className="px-4">
                    <ContentErrorAlert errors={[courseError, modulesError]} />
                </div>
                :
                <div className="px-4 flex flex-col items-center justify-center mt-3">
                    <div>
                        {loadingCourse ?
                            <Skeleton className="w-40 h-6"/>
                            :
                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{course?.name}</h3>
                        }
                    </div>
                    {loadingModules ?
                        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 mt-3">
                            {Array.from({length: 3}, (_, i) => i)
                                .map((i) => (
                                    <Skeleton key={i} className="xl:min-h-80 xl:max-w-sm rounded-lg"/>
                                ))}
                        </div>
                        :
                        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 mt-3">
                            {modules.map((module) => (
                                <Module
                                    module={module}
                                    key={module.id}
                                    courseId={courseId}
                                />
                            ))}
                        </div>
                    }
                </div>
            }

            <ErrorDialog
                errors={[courseError, modulesError]}
            />

        </>
    );
};

export default CoursePage;