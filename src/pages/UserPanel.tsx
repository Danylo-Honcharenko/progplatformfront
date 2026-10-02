import {Navigate} from "react-router-dom";
import CourseCard from "@/components/CourseCard.tsx";
import useCourses from "@/hooks/useCourses.tsx";
import ErrorDialog from "@/components/ErrorDialog.tsx";
import ContentErrorAlert from "@/components/ContentErrorAlert.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {InfoIcon} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {useContext} from "react";
import {AuthContext} from "@/components/AuthProvider.tsx";

const UserPanel = () => {

    const authContext = useContext(AuthContext);
    const {loadingCourses, courses, courseError} = useCourses();

    if (authContext?.notAuthorized) return <Navigate to="/login" replace/>;

    const coursesAmount = courses?.data.courses.length;

    return (
        <>
            <div className="mt-4">
                <div>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Курси</h3>
                </div>
                {loadingCourses ?
                    <div className="mt-5 flex gap-3 flex-wrap">
                        {Array.from({length: 3}, (_, i) => i).map((i) => (
                                <Skeleton key={i} className="w-62.5 h-32 rounded-lg"/>
                            ))}
                    </div>
                    :
                    courseError ?
                        <div className="mt-3">
                            <ContentErrorAlert errors={[courseError]} />
                        </div>
                        :
                    coursesAmount === 0 ?
                        <Alert className="mt-3 max-w-sm">
                            <InfoIcon />
                            <AlertTitle>Доступні курси відсутні</AlertTitle>
                            <AlertDescription>Зверніться до адміністратора щоб стати учасником курсу!</AlertDescription>
                        </Alert>
                        :
                        <div className="mt-5 flex gap-3 flex-wrap">
                            {courses?.data?.courses.map((course) => <CourseCard course={course} key={course.id}/>)}
                        </div>
                }
            </div>
            <div className="mt-10">
                <div>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Результати тестування</h3>
                </div>
                <Alert className="mt-3 max-w-sm">
                    <InfoIcon />
                    <AlertTitle>Результати тестування відсутні</AlertTitle>
                </Alert>
            </div>

            <ErrorDialog
                errors={[authContext?.authError, courseError]}
            />

        </>
    );
};

export default UserPanel;
