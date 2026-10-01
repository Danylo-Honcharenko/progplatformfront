import {Navigate} from "react-router-dom";
import CourseCard from "@/components/CourseCard.tsx";
import useAuth from "@/hooks/useAuth.tsx";
import useCourses from "@/hooks/useCourses.tsx";
import ErrorDialog from "@/components/ErrorDialog.tsx";
import {Alert, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircleIcon, InfoIcon} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton.tsx";

const UserPanel = () => {

    const {notAuthorized, authError} = useAuth();
    const {loadingCourses, courses, courseError} = useCourses();

    if (notAuthorized) return <Navigate to="/login" replace/>;

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
                                <Skeleton key={i} className="w-[250px] h-32 rounded-lg"/>
                            ))}
                    </div>
                    :
                    courseError ?
                        <Alert variant="destructive" className="max-w-sm mt-4">
                            <AlertCircleIcon />
                            <AlertTitle>Помилка при завантаження вмісту</AlertTitle>
                        </Alert>
                        :
                    coursesAmount === 0 ?
                        <Alert className="mt-3 max-w-sm">
                            <InfoIcon />
                            <AlertTitle>Зверніться до адміністратора щоб стати учасником курсу!</AlertTitle>
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
                errors={[authError, courseError]}
            />

        </>
    );
};

export default UserPanel;