import {Button} from "@/components/ui/button.tsx";
import {CheckCheck} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import ReactMarkdown from "react-markdown";
import {CODE, H2, P, PRE, UL} from "@/utils/markDwmStyle.tsx";
import {parsError} from "@/utils/errorParser.ts";
import {useContext, useEffect, useState} from "react";
import {TopicService} from "@/services/TopicService.ts";
import {TopicModel} from "@/type/model/TopicModel.ts";
import {ModuleService} from "@/services/ModuleService.ts";
import {Link, Navigate, useLocation, useParams, useSearchParams} from "react-router-dom";
import {Spinner} from "@/components/ui/spinner.tsx";
import {ErrorType} from "@/type/ErrorType.ts";
import ErrorDialog from "@/components/ErrorDialog.tsx";
import ContentErrorAlert from "@/components/ContentErrorAlert.tsx";
import useCourse from "@/hooks/useCourse.tsx";
import {AuthContext} from "@/AuthProvider.tsx";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";

const TopicsPage = () => {

    const [error, setError] = useState<ErrorType | undefined>(undefined);
    const [topics, setTopics] = useState<TopicModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [topic, setTopic] = useState<TopicModel | undefined>(undefined);
    const [pages, setPages] = useState<number[]>([]);
    const authContext = useContext(AuthContext);

    if (authContext?.authUser.notAuthorized) return <Navigate to="/login" replace/>

    let {moduleId, courseId} = useParams();
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page");

    const location = useLocation();
    const locationState = location.state || {};
    const moduleName = locationState.moduleName;

    const stateCourseName = typeof locationState.courseName === "string"
        ? locationState.courseName
        : undefined;

    const {course, courseError} = useCourse(courseId, !stateCourseName);

    const courseName = stateCourseName || course?.name;

    const pageError = error ?? courseError;

    const setDone = async (topicId: number | undefined, moduleId: string | undefined, userId: number | undefined) => {
        if (topicId === undefined || moduleId === undefined || userId === undefined) return;

        try {
            const moduleService = new ModuleService();
            const response = await moduleService.setCompletedTopic(moduleId, topicId, userId);
            setTopics([
                ...topics.map((topic) => {
                    if (topic.id === response?.data?.topicId) {
                        topic.done = true;
                    }
                    return topic;
                })
            ]);
        } catch (error) {
            const parsedError = parsError(error);
            setError(parsedError);
            console.log(error);
        }
    }

    useEffect(() => {
        if (!page) return;
        setTopic(topics.find((topic) => topic.page === Number.parseInt(page)));
    }, [page, topics]);

    useEffect(() => {
        if (!moduleId) return;

        const topicService = new TopicService();
        topicService.getTopicsByModuleId(moduleId)
            .then((response) => {
                const responseTopics = response?.data.topics ? response.data.topics : [];
                const pages = responseTopics.map((topic) => topic.page)
                    .filter((page) => page !== undefined);

                setTopics(responseTopics);
                setPages(pages);
            })
            .catch((error) => {
                const parsedError = parsError(error);
                setError(parsedError);
            })
            .finally(() => setLoading(false));

    }, []);

    return (
        <>
            {pageError ?
                <div className="flex flex-col h-screen items-center justify-center px-4">
                    <ContentErrorAlert errors={[error, courseError]} />
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
                                <Link
                                    to={`/panel/course/${courseId}`}
                                    state={{...locationState}}
                                >Курс {courseName ?? ""}</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator/>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{moduleName ?? "Модуль"}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex flex-col h-[90vh] justify-center">
                        <div className="shadow-lg rounded-lg px-5 pt-5 pb-5 w-full max-w-4xl mx-auto">
                            {loading ?
                                <div className="flex justify-center items-center">
                                    <Spinner className="size-8" />
                                </div>
                                :
                                <div>
                                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-4">{topic?.name}</h3>
                                    <Button
                                        className="mt-3 cursor-pointer"
                                        variant="outline"
                                        disabled={topic?.done}
                                        onClick={() => setDone(topic?.id, moduleId, authContext?.authUser.user?.data.id)}
                                    ><CheckCheck/></Button>
                                    <Separator className="mt-3"/>
                                    <ScrollArea className="h-112.5">
                                        <ReactMarkdown components={{
                                            p: P,
                                            h2: H2,
                                            pre: PRE,
                                            ul: UL,
                                            code: CODE
                                        }}>{topic?.description}</ReactMarkdown>
                                    </ScrollArea>
                                    <div className="flex justify-between mt-3">
                                        <div className="flex gap-2 items-center">
                                            {pages.map((page) => (
                                                <div key={page}>
                                                    <Link
                                                        to={`?page=${page}`}
                                                        state={{...locationState}}
                                                    >
                                                        <Button
                                                            variant={page === topic?.page ? "default" : "outline"}
                                                            className="cursor-pointer"
                                                        >{page}</Button>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <Button
                                                variant="outline" className="cursor-pointer"
                                                onClick={() => console.log("click!!!")}
                                                disabled={true}
                                            >Завдання</Button>
                                            <Button
                                                className="cursor-pointer"
                                                onClick={() => console.log("click!!!")}
                                                disabled={true}
                                            >Тестування</Button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </>
            }
            <ErrorDialog
                errors={[error, courseError]}
            />
        </>
    );
};

export default TopicsPage;
