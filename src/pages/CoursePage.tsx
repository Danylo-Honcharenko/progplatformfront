import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Link, Navigate, useLocation, useParams} from "react-router-dom";
import Module from "@/components/Module.tsx";
import useModule from "@/hooks/useModule.tsx";
import useCourse from "@/hooks/useCourse.tsx";
import ErrorDialog from "@/components/ErrorDialog.tsx";
import ContentErrorAlert from "@/components/ContentErrorAlert.tsx";
import {useContext, useEffect} from "react";
import {AuthContext} from "@/AuthProvider.tsx";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";

const CoursePage = () => {

    const authContext = useContext(AuthContext);

    let {courseId} = useParams();

    const location = useLocation();
    const stateCourseName = typeof location.state?.courseName === "string"
        ? location.state.courseName
        : undefined;

    const {course, courseError} = useCourse(courseId, !stateCourseName);
    const courseName = stateCourseName || course?.name;

    const {loadingModules, modules, modulesError} = useModule(courseId);

    useEffect(() => {
        document.title = `Курс ${courseName}`;
    }, [courseName]);

    if (authContext?.authUser.notAuthorized) return <Navigate to="/login" replace/>

    return (
        <>
            {modulesError || courseError ?
                <div className="px-4">
                    <ContentErrorAlert errors={[modulesError, courseError]} />
                </div>
                :
                <>
                    <Breadcrumb className="mt-3">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <Link to="/panel" replace>Панель користувача</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator/>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Курс {courseName ?? ""}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="px-4 flex flex-col items-center justify-center">
                        <div>
                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{courseName ?? "Курс"}</h3>
                        </div>
                        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 mt-3">
                            {loadingModules ?
                                Array.from({length: 3}, (_, i) => i)
                                    .map((i) => (
                                        <Skeleton key={i} className="xl:min-h-80 xl:max-w-sm rounded-lg"/>
                                    ))
                                :
                                modules.map((module) => (
                                    <Module
                                        module={module}
                                        key={module.id}
                                        courseName={courseName}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </>
            }

            <ErrorDialog
                errors={[modulesError, courseError]}
            />

        </>
    );
};

export default CoursePage;
