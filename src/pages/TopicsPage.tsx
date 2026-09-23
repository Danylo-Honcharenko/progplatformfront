import {Button} from "@/components/ui/button.tsx";
import {CheckCheck} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import ReactMarkdown from "react-markdown";
import {CODE, H2, P, PRE, UL} from "@/utils/markDwmStyle.tsx";
import {baseErrorHandler} from "@/utils/errorHandler.ts";
import {useEffect, useState} from "react";
import {Response} from "@/type/response/Response.ts";
import {ErrorResponse} from "@/type/response/ErrorResponse.ts";
import {TopicService} from "@/services/TopicService.ts";
import {TopicModel} from "@/type/model/TopicModel.ts";
import useAuth from "@/hooks/useAuth.tsx";
import {ModuleService} from "@/services/ModuleService.ts";
import {Link, Navigate, useParams, useSearchParams} from "react-router-dom";
import {Spinner} from "@/components/ui/spinner.tsx";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import NotAuthorizedDialog from "@/components/NotAuthorizedDialog.tsx";
import BadRequestDialog from "@/components/BadRequestDialog.tsx";


const TopicsPage = () => {

    const [error, setError] = useState<Response<ErrorResponse<string>> | undefined>(undefined);
    const [topics, setTopics] = useState<TopicModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [topic, setTopic] = useState<TopicModel | undefined>(undefined);
    const [pages, setPages] = useState<number[]>([]);
    const {user, notAuthorized} = useAuth();

    let {moduleId, courseId} = useParams();
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page");

    const setDone = async (topicId: number | undefined, moduleId: string | undefined, userId: number | undefined) => {
        if (topicId === undefined || moduleId === undefined || userId === undefined) return;

        try {
            const moduleService = new ModuleService();
            const response = await moduleService.setCompletedTopic(moduleId, topicId, userId);
            setTopics([
                ...topics.map((topic) => {
                    if (topic.id === response.data.topicId) {
                        topic.done = true;
                    }
                    return topic;
                })
            ]);
        } catch (error) {
            baseErrorHandler(error, setError);
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
                setTopics(response.data.topics);
                const pages = response.data.topics.map((topic) => topic.page)
                    .filter((page) => page !== undefined);
                setPages(pages);
            })
            .catch((error) => baseErrorHandler(error, setError))
            .finally(() => setLoading(false));

    }, []);

    if (notAuthorized) return <Navigate to="/login" replace/>

    return (
        <>
            <div className="flex flex-col h-screen items-center justify-center">
                <div className="shadow-lg rounded-lg p-5 w-1/2">
                    {loading ?
                        <div className="flex justify-center items-center">
                            <Spinner className="size-8" />
                        </div>
                        :
                        <div>
                            <Link to={`/course/${courseId}`}>
                                <Button
                                    variant="outline"
                                    className="mt-4 cursor-pointer"
                                >Назад</Button>
                            </Link>
                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-4">{topic?.name}</h3>
                            <Button
                                className="mt-3 cursor-pointer"
                                variant="outline"
                                disabled={topic?.done}
                                onClick={() => setDone(topic?.id, moduleId, user?.data.id)}
                            ><CheckCheck/></Button>
                            <Separator className="mt-3"/>
                            <ScrollArea className="h-[450px]">
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
                                            <Link to={`/course/${courseId}/module/${moduleId}/topic?page=${page}`}>
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
                                    >Завдання</Button>
                                    <Button
                                        className="cursor-pointer"
                                    >Тестування</Button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>

            <AlertDialog open={error !== undefined && error.status === 500}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-red-500">Помилка серверу</AlertDialogTitle>
                        <AlertDialogDescription>
                            <p>{typeof error?.data.details === "string" ? error?.data.details : "Невідома помилка!"}</p>
                            <p className="text-black mt-3">MSID: {error?.data.msid}</p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>

            <BadRequestDialog
                error={error}
            />

            <NotAuthorizedDialog
                notAuth={error?.status === 401}
            />
        </>
    );
};

export default TopicsPage;