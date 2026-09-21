import {Navigate, useParams} from "react-router-dom";
import useAuth from "@/hooks/useAuth.tsx";
import Course from "@/components/Course.tsx";

const CoursePage = () => {

    // const [course, setCourse] = useState<Response<CourseModel> | undefined>(undefined);
    // const [_, setError] = useState<Response<ErrorResponse<string>> | undefined>(undefined);
    // const [topics, setTopics] = useState<TopicModel[] | undefined>(undefined);
    // const [topic, setTopic] = useState<TopicModel | undefined>(undefined);
    // const [open, setOpen] = useState<boolean>(false);
    // const [openTest, setOpenTest] = useState<boolean>(false);
    // const [testResult, setTestResult] = useState<Response<TestResult> | undefined>(undefined);
    // const [module, setModule] = useState<ModuleModel | undefined>(undefined);
    // const [moduleState, setModuleState] = useState<Response<CreateModulStateResponse> | undefined>(undefined);
    // const [loadingCourse, setLoadingCourse] = useState<boolean>(true);
    // const [isTestSendForCheck, setIsTestSendForCheck] = useState<boolean>(false);

    const {notAuthorized} = useAuth();

    let {id} = useParams();

    // const loadCourse = async () => {
    //     try {
    //         const courseService = new CourseService();
    //
    //         const response = await courseService.getCourseByIdWithUserStat(id);
    //
    //         setCourse(response);
    //     } catch (error) {
    //         baseErrorHandler(error, setError);
    //         console.log(error);
    //     } finally {
    //         setLoadingCourse(false);
    //     }
    // }
    //
    // useEffect(() => {
    //
    //     loadCourse().then();
    //
    // }, []);

    if (notAuthorized) return <Navigate to="/login" replace/>

    // const setDone = async (topicId: number | undefined) => {
    //     if (topicId === undefined) return;
    //
    //     try {
    //         const moduleService = new ModuleService();
    //         const response = await moduleService.setCompletedTopic(module?.id, topicId, user?.data.id);
    //         setModuleState(response);
    //     } catch (error) {
    //         baseErrorHandler(error, setError);
    //         console.log(error)
    //     }
    // }

    // useEffect(() => {
    //     if (moduleState?.status === 201 && course !== undefined) {
    //         const topicIdStat = moduleState.data.topicId;
    //         const moduleIdStat = moduleState.data.moduleId;
    //         const moduleArray = course.data.modules;
    //
    //         let module = course.data.modules.find(e => e.id === moduleIdStat);
    //         let moduleIndex = course.data.modules.findIndex(e => e.id === moduleIdStat);
    //         let topic = module?.topics.find(e => e.id === topicIdStat);
    //         let topicIndex = module?.topics.findIndex(e => e.id === topicIdStat);
    //
    //         if (topic !== undefined) {
    //             topic = {...topic, done: true};
    //             if (topicIndex !== undefined && module !== undefined) {
    //                 module.topics[topicIndex] = topic;
    //                 moduleArray[moduleIndex] = module;
    //             }
    //         }
    //         setCourse({
    //             ...course,
    //             data: {
    //                 ...course.data,
    //                 modules: [...moduleArray]
    //             }
    //         })
    //         setTopic(topic);
    //     }
    // }, [moduleState]);

    // const answersCurrent: AnswerResponse[] = [];
    // const handleChange = (question: string, answer: string) => {
    //     const foundQuestion = answersCurrent.findIndex((q) => q.question === question);
    //     if (foundQuestion !== -1) {
    //         answersCurrent.splice(foundQuestion, 1, {"question": question, "answer": answer});
    //         return;
    //     }
    //     answersCurrent.push({"question": question, "answer": answer});
    // };

    // const sendTest = async (event: FormEvent<HTMLFormElement>, testUUID: string | undefined) => {
    //     event.preventDefault();
    //     if (testUUID === undefined) return;
    //
    //     try {
    //         const testService = new TestService();
    //         const response = await testService.checkTest(testUUID, user?.data.id, answersCurrent);
    //         setTestResult(response);
    //         setIsTestSendForCheck(true);
    //     } catch (error) {
    //         baseErrorHandler(error, setError);
    //         console.log(error);
    //     }
    // }

    // const checkIsAnswerCorrect = (question: string) => {
    //     if (testResult !== undefined) {
    //         return testResult.data.correctAnswers.find((e: AnswerResponse) => e.question === question) !== undefined;
    //     }
    // }

    // const setActiveTopic = (page: number) => {
    //     const topic = topics?.find((topic) => topic.page === page);
    //     setTopic(topic);
    // }

    return (
        <>
            {/*{openTest ?*/}
            {/*    // <div className="flex flex-col items-center justify-center pb-8">*/}
            {/*    //     <div className="w-1/2">*/}
            {/*    //         <div>*/}
            {/*    //             <Button onClick={() => {*/}
            {/*    //                 setOpenTest(false);*/}
            {/*    //                 setIsTestSendForCheck(false);*/}
            {/*    //             }} variant="outline" className="mt-4 cursor-pointer">Назад</Button>*/}
            {/*    //         </div>*/}
            {/*    //         <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-3 text-center">{topic?.tests[0].name}</h3>*/}
            {/*    //         <form className="mt-4" onSubmit={(e) => sendTest(e, topic?.tests[0].uuid)}>*/}
            {/*    //             <div className="flex flex-col gap-2">*/}
            {/*    //                 {topic?.tests[0].questions.map((question, index) => (*/}
            {/*    //                     <div key={index}>*/}
            {/*    //                         <div className="p-6 bg-gray-50 rounded-lg">*/}
            {/*    //                             <Label className="text-lg">{question.question}</Label>*/}
            {/*    //                             <RadioGroup*/}
            {/*    //                                 onValueChange={(e) => handleChange(question.question, e)}*/}
            {/*    //                                 className="mt-3"*/}
            {/*    //                                 disabled={isTestSendForCheck}>*/}
            {/*    //                                 {question.options.map((option, i) => (*/}
            {/*    //                                     <div className="flex items-center space-x-2"*/}
            {/*    //                                          key={i}>*/}
            {/*    //                                         <RadioGroupItem*/}
            {/*    //                                             value={option}*/}
            {/*    //                                             className="bg-white"*/}
            {/*    //                                         />*/}
            {/*    //                                         <Label className="font-normal text-base">{option}</Label>*/}
            {/*    //                                     </div>*/}
            {/*    //                                 ))}*/}
            {/*    //                             </RadioGroup>*/}
            {/*    //                         </div>*/}
            {/*    //                         {isTestSendForCheck ?*/}
            {/*    //                             testResult !== undefined && testResult.status === 200 && checkIsAnswerCorrect(question.question) ?*/}
            {/*    //                                 <div*/}
            {/*    //                                     className="p-6 bg-green-200 rounded-lg border-green-400 border-2 mt-2 flex gap-1 items-center">*/}
            {/*    //                                     <Check/>*/}
            {/*    //                                     <p>Правильно відповіли</p>*/}
            {/*    //                                 </div>*/}
            {/*    //                                 :*/}
            {/*    //                                 <div*/}
            {/*    //                                     className="p-6 bg-red-200 rounded-lg border-red-400 border-2 mt-2 flex gap-1 items-center">*/}
            {/*    //                                     <ListXIcon/>*/}
            {/*    //                                     <p>Неправильно відповіли</p>*/}
            {/*    //                                 </div>*/}
            {/*    //                             :*/}
            {/*    //                             <></>*/}
            {/*    //                         }*/}
            {/*    //                     </div>*/}
            {/*    //                 ))}*/}
            {/*    //             </div>*/}
            {/*    //             <div className="mt-3">*/}
            {/*    //                 <Button className="cursor-pointer w-full h-10"*/}
            {/*    //                         disabled={isTestSendForCheck}>Перевірити</Button>*/}
            {/*    //             </div>*/}
            {/*    //         </form>*/}
            {/*    //         {isTestSendForCheck && testResult?.status === 200 ?*/}
            {/*    //             <div className="mt-4">*/}
            {/*    //                 <div className="flex items-center justify-between">*/}
            {/*    //                     <div>*/}
            {/*    //                         <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-4">Оцінка</h3>*/}
            {/*    //                         <p className="mt-2">Ви набрали {testResult.data.currentAssessment} балів*/}
            {/*    //                             з {testResult.data.maxAssessment} можливих.</p>*/}
            {/*    //                     </div>*/}
            {/*    //                     <div>*/}
            {/*    //                         <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">{testResult.data.currentAssessment}/{testResult.data.maxAssessment}</h4>*/}
            {/*    //                     </div>*/}
            {/*    //                 </div>*/}
            {/*    //             </div>*/}
            {/*    //             :*/}
            {/*    //             <></>*/}
            {/*    //         }*/}
            {/*    //     </div>*/}
            {/*    // </div>*/}
            {/*    <></>*/}
            {/*    :*/}
            {/*    !open ?*/}
            {/*        <Course*/}
            {/*            courseName={course?.data.name}*/}
            {/*            isCourseLoading={loadingCourse}*/}
            {/*            modules={course?.data.modules}*/}
            {/*        />*/}
            {/*        :*/}
            {/*        <Topic */}
            {/*            topics={undefined} */}
            {/*            user={user?.data} */}
            {/*            activeTopic={topic} */}
            {/*            module={module} */}
            {/*        />*/}
            {/*}*/}

            <Course
                courseId={id}
            />
        </>
    );
};

export default CoursePage;