import {Navigate} from "react-router-dom";
import CourseCard from "@/components/CourseCard.tsx";
import useAuth from "@/hooks/useAuth.tsx";
import useCourses from "@/hooks/useCourses.tsx";
import ServerErrorDialog from "@/components/ServerErrorDialog.tsx";
import BadRequestDialog from "@/components/BadRequestDialog.tsx";

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

            <BadRequestDialog
                error={[authError, courseError]}
            />

            <ServerErrorDialog
                error={[authError, courseError]}
            />

        </>
    );
};

export default UserPanel;