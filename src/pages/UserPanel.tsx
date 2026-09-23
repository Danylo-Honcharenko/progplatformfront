import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {Navigate} from "react-router-dom";
import CourseCard from "@/components/CourseCard.tsx";
import PanelHeader from "@/components/PanelHeader.tsx";
import useAuth from "@/hooks/useAuth.tsx";
import useCourses from "@/hooks/useCourses.tsx";

const UserPanel = () => {

    // const [testResults, _] = useState<Response<TestResultResponse> | undefined>(undefined);

    const {loadingUser, user, notAuthorized, authError} = useAuth();
    const {loadingCourses, courses, courseError} = useCourses();

    const error = {...authError, ...courseError};

    if (notAuthorized) return <Navigate to="/login" replace/>;

    const coursesAmount = courses?.data.courses?.length;
    // const testResultsAmount = testResults?.data.results?.length;

    return (
        <div>
            <div className="pl-35 pr-35 pt-3">
                <PanelHeader
                    title="Панель користувача"
                    loading={loadingUser}
                    user={user}
                />
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
                    {/*{testResultsAmount === 0 ?*/}
                    {/*    <div className="mt-4">*/}
                    {/*        <p>Результати тестування відсутні!</p>*/}
                    {/*    </div>*/}
                    {/*    :*/}
                    {/*    <div className="flex flex-col mt-4 gap-3">*/}
                    {/*        <Accordion type="single" collapsible>*/}
                    {/*        {testResults?.data.results.map((result, i) => (*/}
                    {/*                <AccordionItem value={`item-${i}`} key={i}>*/}
                    {/*                    <AccordionTrigger className="cursor-pointer text-base">{result.created}</AccordionTrigger>*/}
                    {/*                    <AccordionContent className="p-2 bg-zinc-50">*/}
                    {/*                        <div>*/}
                    {/*                            <div className="flex items-center justify-between">*/}
                    {/*                                <div>*/}
                    {/*                                    <h2 className="text-xl font-semibold m-0">Правильно відповіли</h2>*/}
                    {/*                                </div>*/}
                    {/*                                <div>*/}
                    {/*                                    <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">{result.currentAssessment}/{result.maxAssessment}</h4>*/}
                    {/*                                </div>*/}
                    {/*                            </div>*/}
                    {/*                            <div className="mt-2 flex flex-col gap-1.5">*/}
                    {/*                                {result.correctAnswers.map((answer, i) => (*/}
                    {/*                                    <div key={i} className="text-base">*/}
                    {/*                                        <p>{answer.question}</p>*/}
                    {/*                                    </div>*/}
                    {/*                                ))}*/}
                    {/*                            </div>*/}
                    {/*                        </div>*/}
                    {/*                        <div className="mt-3">*/}
                    {/*                            <h2 className="text-xl font-semibold">Неправильно відповіли</h2>*/}
                    {/*                            <div className="mt-2 flex flex-col gap-1.5">*/}
                    {/*                                {result.wrongAnswers.map((answer, i) => (*/}
                    {/*                                    <div key={i} className="text-base">*/}
                    {/*                                        <p>{answer.question}</p>*/}
                    {/*                                        <p>Правильна відповідь: {answer.correctAnswer}</p>*/}
                    {/*                                    </div>*/}
                    {/*                                ))}*/}
                    {/*                            </div>*/}
                    {/*                        </div>*/}
                    {/*                    </AccordionContent>*/}
                    {/*                </AccordionItem>*/}
                    {/*        ))}*/}
                    {/*        </Accordion>*/}
                    {/*    </div>*/}
                    {/*}*/}
                </div>
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
        </div>
    );
};

export default UserPanel;