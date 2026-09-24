import {Navigate} from "react-router-dom";
import CourseCard from "@/components/CourseCard.tsx";
import useAuth from "@/hooks/useAuth.tsx";
import useCourses from "@/hooks/useCourses.tsx";
import {AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle} from "@radix-ui/react-alert-dialog";
import {AlertDialogHeader} from "@/components/ui/alert-dialog.tsx";

const UserPanel = () => {

    const {notAuthorized, authError} = useAuth();
    const {loadingCourses, courses, courseError} = useCourses();

    const error = {...authError, ...courseError};

    if (notAuthorized) return <Navigate to="/login" replace/>;

    const coursesAmount = courses?.data.courses?.length;

    return (
        <>
            <div className="mt-4">
                <div>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Курси</h3>
                </div>
                {loadingCourses ?
                    <div>
                        <p>Завантаження...</p>
                    </div>
                    :
                    coursesAmount === 0 ?
                        <div className="mt-5">
                            <p>Зверніться до адміністратора щоб стати учасником курсу!</p>
                        </div>
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
                <p>Результати тестування відсутні!</p>
            </div>

            <AlertDialog open={error.status === 500}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-red-500">Помилка серверу</AlertDialogTitle>
                        <AlertDialogDescription>
                            <p>{typeof error?.data?.details === "string" ? error?.data.details : "Невідома помилка!"}</p>
                            <p className="text-black mt-3">MSID: {error?.data?.msid}</p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>

        </>
    );
};

export default UserPanel;