import {useEffect, useState} from 'react';
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Response} from "@/type/response/Response.ts";
import {UserResponse} from "@/type/response/UserResponse.ts";
import {ErrorResponse} from "@/type/response/ErrorResponse.ts";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {TestResultResponse} from "@/type/response/TestResultResponse.ts";
import {Link, Navigate} from "react-router-dom";
import {CoursesResponse} from "@/type/response/CoursesResponse.ts";
import {UserService} from "@/services/UserService.ts";
import {TestService} from "@/services/TestService.ts";
import {CourseService} from "@/services/CourseService.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenu, DropdownMenuLabel, DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import {ChevronDown, Home, LogOut, User} from 'lucide-react';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {baseErrorHandler} from "@/utils/errorHandler.ts";

const UserControlPanel = () => {

    const [user, setUser] = useState<Response<UserResponse> | undefined>(undefined);
    const [error, setError] = useState<Response<ErrorResponse<string>> | undefined>(undefined);
    const [isLogout, setLogout] = useState<boolean>(false);
    const [testResults, setTestResults] = useState<Response<TestResultResponse> | undefined>(undefined);
    const [courses, setCourses] = useState<Response<CoursesResponse> | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    const loadData = async () => {
        try {
            const userService = new UserService();
            const courseService = new CourseService();
            const testService = new TestService();

            const responses = await Promise.all([
                userService.getAuthUser(),
                testService.getTestResults(),
                courseService.getUserCourses()
            ]);

            setUser(responses[0]);
            setTestResults(responses[1]);
            setCourses(responses[2]);
        } catch (error) {
            baseErrorHandler(error, setError);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        loadData().then();

    }, [isLogout]);

    if (error !== undefined && error.status === 401) return <Navigate to="/login" replace/>;

    const logout = async () => {
        try {
            const userService = new UserService();
            await userService.logout();
            setLogout(true);
        } catch (error) {
            baseErrorHandler(error, setError);
            console.log(error);
        }
    }

    const coursesAmount = courses?.data.courses?.length;
    const testResultsAmount = testResults?.data.results?.length;

    return (
        <div>
            <div className="pl-35 pr-35 pt-3">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl">Панель користувача</h2>
                    </div>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='ghost' className="cursor-pointer">{loading ? <Skeleton className="w-16 h-5 rounded-lg"/> : user?.data.lastName + " " + user?.data.firstName}<ChevronDown /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel><Badge>{user?.data.levelAlias}</Badge>Рівень: {user?.data.level}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <Link to="/user-profile" replace>
                                        <DropdownMenuItem>
                                            <User/>
                                            <span>Профіль</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem onClick={logout}>
                                        <LogOut/>
                                        <span>Вийти</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <Link to="/" replace>
                                        <DropdownMenuItem>
                                            <Home/><span>На головну</span>
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <Separator className="mt-2"/>
                <div className="mt-4">
                    <div>
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Курси</h3>
                    </div>
                    {loading ?
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
                                {courses?.data?.courses.map((course, i) => (
                                    <a href={`/course/${course.id}`} key={i}>
                                        <div
                                            className="flex justify-center items-center gap-6 p-5 shadow-md rounded-lg w-[250px] h-32 hover:shadow-lg">
                                            <h2 className="font-semibold text-xl">{course.name}</h2>
                                        </div>
                                    </a>
                                ))}
                            </div>
                    }
                </div>
                <div className="mt-10">
                    <div>
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Результати тестування</h3>
                    </div>
                    {testResultsAmount === 0 ?
                        <div className="mt-4">
                            <p>Результати тестування відсутні!</p>
                        </div>
                        :
                        <div className="flex flex-col mt-4 gap-3">
                            <Accordion type="single" collapsible>
                            {testResults?.data.results.map((result, i) => (
                                    <AccordionItem value={`item-${i}`} key={i}>
                                        <AccordionTrigger className="cursor-pointer text-base">{result.created}</AccordionTrigger>
                                        <AccordionContent className="p-2 bg-zinc-50">
                                            <div>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h2 className="text-xl font-semibold m-0">Правильно відповіли</h2>
                                                    </div>
                                                    <div>
                                                        <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">{result.currentAssessment}/{result.maxAssessment}</h4>
                                                    </div>
                                                </div>
                                                <div className="mt-2 flex flex-col gap-1.5">
                                                    {result.correctAnswers.map((answer, i) => (
                                                        <div key={i} className="text-base">
                                                            <p>{answer.question}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <h2 className="text-xl font-semibold">Неправильно відповіли</h2>
                                                <div className="mt-2 flex flex-col gap-1.5">
                                                    {result.wrongAnswers.map((answer, i) => (
                                                        <div key={i} className="text-base">
                                                            <p>{answer.question}</p>
                                                            <p>Правильна відповідь: {answer.correctAnswer}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                            ))}
                            </Accordion>
                        </div>
                    }
                </div>
            </div>
            <AlertDialog open={error !== undefined && error.status === 500}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-red-500">Помилка серверу</AlertDialogTitle>
                        <AlertDialogDescription>
                            <p>{typeof error?.data.details === "string" ? error?.data.details : "Не вдалося відобразити помилку!"}</p>
                            <p className="text-black mt-3">MSID: {error?.data.msid}</p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default UserControlPanel;