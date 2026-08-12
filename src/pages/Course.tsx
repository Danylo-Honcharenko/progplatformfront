import {FormEvent, useEffect, useState} from "react";
import {Response} from "@/type/response/Response.ts";
import {ErrorResponse} from "@/type/response/ErrorResponse.ts";
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import ReactMarkdown from "react-markdown";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {UserResponse} from "@/type/response/UserResponse.ts";
import {Link, Navigate, useParams} from "react-router-dom";
import {Label} from "@/components/ui/label.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {TestResult} from "@/type/response/TestResultResponse.ts";
import {Check, CheckCheck, ListXIcon} from "lucide-react";
import {AnswerResponse} from "@/type/response/AnswerResponse.ts";
import {CourseModel} from "@/type/model/CourseModel.ts";
import {CreateModulStateResponse} from "@/type/response/CreateModulStateResponse";
import {CODE, H2, P, PRE, UL} from "@/utils/markDwmStyle.tsx";
import {TopicModel} from "@/type/model/TopicModel";
import {userService} from "@/services/userService.ts";
import {courseService} from "@/services/courseService.ts";
import {moduleService} from "@/services/moduleService.ts";
import {testService} from "@/services/testService.ts";
import {responseUserDataHandler} from "@/utils/responseUserDataHandler.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

const Course = () => {

    const [user, setUser] = useState<Response<UserResponse> | undefined>(undefined);
    const [course, setCourse] = useState<Response<CourseModel> | undefined>(undefined);
    const [error, setError] = useState<Response<ErrorResponse<string>> | undefined>(undefined);
    const [topics, setTopics] = useState<TopicModel[] | undefined>(undefined);
    const [topic, setTopic] = useState<TopicModel | undefined>(undefined);
    const [open, setOpen] = useState<boolean>(false);
    const [openTest, setOpenTest] = useState<boolean>(false);
    const [testResult, setTestResult] = useState<Response<TestResult> | undefined>(undefined);
    const [moduleId, setModuleId] = useState<number>(0);
    const [moduleState, setModuleState] = useState<Response<CreateModulStateResponse> | undefined>(undefined);
    const [loadingCourse, setLoadingCourse] = useState<boolean>(true);
    const [isTestSendForCheck, setIsTestSendForCheck] = useState<boolean>(false);

    let {id} = useParams();

    console.log(topic)

    useEffect(() => {
        userService.checkIsAuthUser()
            .then(res => responseUserDataHandler(res.data, (userRespData: Response<UserResponse>) => {
                setUser(userRespData);
                courseService.getCourseByIdAndStaticByUserId(id, userRespData.data.id)
                    .then((res) => setCourse(res.data))
                    .then(() => setLoadingCourse(false))
                    .catch((err) => setError(err));
            }))
            .catch((err) => setError(err.response));
    }, [moduleState, testResult]);

    if (error !== undefined && error.status === 401) return <Navigate to="/login" replace/>

    const setDone = (topicId: number | undefined) => {
        if (topicId !== undefined) {
            moduleService.setCompletedTopic(moduleId, topicId, user?.data.id)
                .then((res) => setModuleState(res.data))
                .catch((err) => setError(err));
        }
    }

    useEffect(() => {
        if (moduleState?.status === 201 && course !== undefined) {
            const topicIdStat = moduleState.data.topicId;
            const moduleIdStat = moduleState.data.moduleId;
            const moduleArray = course.data.modules;

            let module = course.data.modules.find(e => e.id === moduleIdStat);
            let moduleIndex = course.data.modules.findIndex(e => e.id === moduleIdStat);
            let topic = module?.topics.find(e => e.id === topicIdStat);
            let topicIndex = module?.topics.findIndex(e => e.id === topicIdStat);

            if (topic !== undefined) {
                topic = {...topic, done: true};
                if (topicIndex !== undefined && module !== undefined) {
                    module.topics[topicIndex] = topic;
                    moduleArray[moduleIndex] = module;
                }
            }
            setCourse({
                ...course,
                data: {
                    ...course.data,
                    modules: [...moduleArray]
                }
            })
            setTopic(topic);
        }
    }, [moduleState]);

    const answersCurrent: AnswerResponse[] = [];
    const handleChange = (question: string, answer: string) => {
        const foundQuestion = answersCurrent.findIndex((q) => q.question === question);
        if (foundQuestion !== -1) {
            answersCurrent.splice(foundQuestion, 1, {"question": question, "answer": answer});
            return;
        }
        answersCurrent.push({"question": question, "answer": answer});
    };

    const sendTest = (event: FormEvent<HTMLFormElement>, testUUID: string | undefined) => {
        event.preventDefault();

        if (testUUID !== undefined) {
            testService.checkTest(testUUID, user?.data.id, answersCurrent)
                .then((res) => setTestResult(res.data))
                .then(() => setIsTestSendForCheck(true))
                .catch((err) => setError(err));
        }
    }

    const map = new Map();
    let count = 1;
    if (topics !== undefined) {
        for (const topic of topics) {
            map.set(count, topic);
            count++;
        }
    }

    const checkIsAnswerCorrect = (question: string) => {
        if (testResult !== undefined) {
            return testResult.data.correctAnswers.find((e: AnswerResponse) => e.question === question) !== undefined;
        }
    }

    return (
        <div>
            {loadingCourse ?
                <div className="text-center p-3 absolute w-full">
                    <p>Завантаження...</p>
                </div>
                :
                <></>
            }
            {openTest ?
                <div className="flex flex-col items-center justify-center pb-8">
                    <div className="w-1/2">
                        <div>
                            <Button onClick={() => {
                                setOpenTest(false);
                                setIsTestSendForCheck(false);
                            }} variant="outline" className="mt-4 cursor-pointer">Назад</Button>
                        </div>
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-3 text-center">{topic?.tests[0].name}</h3>
                        <form className="mt-4" onSubmit={(e) => sendTest(e, topic?.tests[0].uuid)}>
                            <div className="flex flex-col gap-2">
                                {topic?.tests[0].questions.map((question, index) => (
                                    <div key={index}>
                                        <div className="p-6 bg-gray-50 rounded-lg">
                                            <Label className="text-lg">{question.question}</Label>
                                            <RadioGroup
                                                onValueChange={(e) => handleChange(question.question, e)}
                                                className="mt-3"
                                                disabled={isTestSendForCheck}>
                                                {question.options.map((option, i) => (
                                                    <div className="flex items-center space-x-2"
                                                         key={i}>
                                                        <RadioGroupItem
                                                            value={option}
                                                            className="bg-white"
                                                        />
                                                        <Label className="font-normal text-base">{option}</Label>
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        </div>
                                        {isTestSendForCheck ?
                                            testResult !== undefined && testResult.status === 200 && checkIsAnswerCorrect(question.question) ?
                                                <div
                                                    className="p-6 bg-green-200 rounded-lg border-green-400 border-2 mt-2 flex gap-1 items-center">
                                                    <Check/>
                                                    <p>Правильно відповіли</p>
                                                </div>
                                                :
                                                <div
                                                    className="p-6 bg-red-200 rounded-lg border-red-400 border-2 mt-2 flex gap-1 items-center">
                                                    <ListXIcon/>
                                                    <p>Неправильно відповіли</p>
                                                </div>
                                            :
                                            <></>
                                        }
                                    </div>
                                ))}
                            </div>
                            <div className="mt-3">
                                <Button className="cursor-pointer w-full h-10"
                                        disabled={isTestSendForCheck}>Перевірити</Button>
                            </div>
                        </form>
                        {isTestSendForCheck && testResult?.status === 200 ?
                            <div className="mt-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-4">Оцінка</h3>
                                        <p className="mt-2">Ви набрали {testResult.data.currentAssessment} балів
                                            з {testResult.data.maxAssessment} можливих.</p>
                                    </div>
                                    <div>
                                        <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">{testResult.data.currentAssessment}/{testResult.data.maxAssessment}</h4>
                                    </div>
                                </div>
                            </div>
                            :
                            <></>
                        }
                    </div>
                </div>
                :
                !open ?
                    <>
                        <div className="flex flex-col h-screen items-center gap-5 justify-center">
                            <div>
                                {loadingCourse ?
                                    <Skeleton className="w-40 h-6"/>
                                    :
                                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{course?.data.name}</h3>
                                }
                            </div>
                            {loadingCourse ?
                                <div className="flex gap-6 flex-wrap justify-center">
                                    <Skeleton className="w-[410px] h-80 rounded-lg"/>
                                    <Skeleton className="w-[410px] h-80 rounded-lg"/>
                                    <Skeleton className="w-[410px] h-80 rounded-lg"/>
                                </div>
                                :
                                <div className="flex gap-6 flex-wrap justify-center">
                                    {course?.data.modules.map((module, i) => (
                                        <div key={i} className="flex flex-col gap-5">
                                            <div
                                                className="flex flex-col gap-6 p-5 shadow-lg rounded-lg w-[410px] justify-between h-80"
                                                key={i}>
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{module.name}</h4>
                                                    </div>
                                                    <div>
                                                        <p>{module.complete}%</p>
                                                    </div>
                                                </div>
                                                <p>{module.description}</p>
                                                <Button variant="outline" className="cursor-pointer"
                                                        disabled={module.topics.length === 0} onClick={() => {
                                                    setTopics(module.topics);
                                                    setOpen(true);
                                                    setTopic(module.topics[0]);
                                                    setModuleId(module.id);
                                                }}>Перейти</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                            <Button asChild variant="link" className="p-0"><Link to="/user" replace>До особистого
                                кабінету</Link></Button>
                        </div>
                    </>
                    :
                    <div className="flex flex-col h-screen items-center justify-center">
                        <div className="shadow-lg rounded-lg p-5 w-1/2">
                            {topics !== undefined ?
                                <div>
                                    <Button variant="outline" className="mt-4 cursor-pointer" onClick={() => {
                                        setTopics(undefined);
                                        setOpen(false);
                                    }}>Назад</Button>
                                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-4">{topic?.name}</h3>
                                    <Button className="mt-3 cursor-pointer" variant="outline" disabled={topic?.done}
                                            onClick={() => setDone(topic?.id)}><CheckCheck/></Button>
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
                                            {Array.from(map).map(([key, value]) => (
                                                <div key={key}>
                                                    <Button variant={value.id === topic?.id ? "default" : "outline"}
                                                            className="cursor-pointer"
                                                            onClick={() => setTopic(value)}>{key}</Button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <Button variant="outline" className="cursor-pointer"
                                                    disabled={topic?.exercise === undefined}
                                                    onClick={() => console.log("click!!!")}>Завдання</Button>
                                            <Button className="cursor-pointer"
                                                    disabled={topic.tests == undefined || topic?.tests.length == 0}
                                                    onClick={() => setOpenTest(true)}>Тестування</Button>
                                        </div>
                                    </div>
                                </div> :
                                <></>
                            }
                        </div>
                    </div>
            }
        </div>
    );
};

export default Course;