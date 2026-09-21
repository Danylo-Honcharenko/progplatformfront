import {Button} from "@/components/ui/button.tsx";
import {CheckCheck} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import ReactMarkdown from "react-markdown";
import {CODE, H2, P, PRE, UL} from "@/utils/markDwmStyle.tsx";
import {TopicModel} from "@/type/model/TopicModel.ts";
import {ModuleService} from "@/services/ModuleService.ts";
import {baseErrorHandler} from "@/utils/errorHandler.ts";
import {useEffect, useState} from "react";
import {Response} from "@/type/response/Response.ts";
import {ErrorResponse} from "@/type/response/ErrorResponse.ts";
import {UserResponse} from "@/type/response/UserResponse.ts";
import {CreateModulStateResponse} from "@/type/response/CreateModulStateResponse.ts";
import {ModuleModel} from "@/type/model/ModuleModel.ts";

type Props = {
    topics: TopicModel[] | undefined;
    user: UserResponse | undefined;
    activeTopic: TopicModel | undefined;
    module: ModuleModel | undefined;
};

const Topic = ({topics, user, module}: Props) => {

    const [moduleState, setModuleState] = useState<Response<CreateModulStateResponse> | undefined>(undefined);
    const [_, setError] = useState<Response<ErrorResponse<string>> | undefined>(undefined);
    const [topic, setTopic] = useState<TopicModel | undefined>(undefined);


    const setDone = async (topicId: number | undefined, moduleId: number | undefined, userId: number | undefined) => {
        if (topicId === undefined || moduleId === undefined || userId === undefined) return;

        try {
            const moduleService = new ModuleService();
            const response = await moduleService.setCompletedTopic(moduleId, topicId, userId);
            setModuleState(response);
        } catch (error) {
            baseErrorHandler(error, setError);
            console.log(error)
        }
    }

    const setActiveTopic = (page: number) => {
        const topic = topics?.find((topic) => topic.page === page);
        setTopic(topic);
    }

    useEffect(() => {
        // if (moduleState?.status === 201 && course !== undefined) {
        //     const topicIdStat = moduleState.data.topicId;
        //     const moduleIdStat = moduleState.data.moduleId;
        //     const moduleArray = course.data.modules;
        //
        //     let module = course.data.modules.find(e => e.id === moduleIdStat);
        //     let moduleIndex = course.data.modules.findIndex(e => e.id === moduleIdStat);
        //     let topic = module?.topics.find(e => e.id === topicIdStat);
        //     let topicIndex = module?.topics.findIndex(e => e.id === topicIdStat);
        //
        //     if (topic !== undefined) {
        //         topic = {...topic, done: true};
        //         if (topicIndex !== undefined && module !== undefined) {
        //             module.topics[topicIndex] = topic;
        //             moduleArray[moduleIndex] = module;
        //         }
        //     }
        //     setCourse({
        //         ...course,
        //         data: {
        //             ...course.data,
        //             modules: [...moduleArray]
        //         }
        //     })
        //     setTopic(topic);
        // }
    }, [moduleState]);


    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <div className="shadow-lg rounded-lg p-5 w-1/2">
                {topics !== undefined ?
                    <div>
                        <Button variant="outline" className="mt-4 cursor-pointer" onClick={() => {
                            // setTopics(undefined);
                            // setOpen(false);
                        }}>Назад</Button>
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-4">{topic?.name}</h3>
                        <Button className="mt-3 cursor-pointer" variant="outline" disabled={topic?.done}
                                onClick={() => setDone(topic?.id, undefined, user?.id)}><CheckCheck/></Button>
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
                                {module?.pages.map((page) => (
                                    <div key={page}>
                                        <Button
                                            variant={page === topic?.page ? "default" : "outline"}
                                            className="cursor-pointer"
                                            onClick={() => setActiveTopic(page)}
                                        >{page}</Button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-3 items-center">
                                <Button variant="outline" className="cursor-pointer"
                                        disabled={topic?.exercise === undefined}
                                        onClick={() => console.log("click!!!")}>Завдання</Button>
                                <Button className="cursor-pointer"
                                        disabled={topic?.tests == undefined || topic?.tests.length == 0}
                                        // onClick={() => setOpenTest(true)}
                                >Тестування</Button>
                            </div>
                        </div>
                    </div> :
                    <></>
                }
            </div>
        </div>
    );
};

export default Topic;