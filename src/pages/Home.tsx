import PageBody from "../components/PageBody.tsx";
import homeScreen from "../assets/homeScreen.png"
import courseStruct from "../assets/courseStuct.png"
import exercise from  "../assets/exersize.png"
import stat from "../assets/dynamic.png"
import level from "../assets/level.png"
import progForWin from "../assets/courseProgForWindows.png"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";

const Home = () => {
    return (
        <PageBody>
            <div>
                <div className="flex justify-between items-center">
                    <div className="w-96 flex flex-col gap-2">
                        <h1 className="font-bold text-2xl">Сайт для вивчення мов програмування</h1>
                        <p>Легкий у використанні</p>
                        <Dialog>
                            <DialogTrigger asChild><Button className="cursor-pointer w-fit">Програма для Windows</Button></DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Програма для Windows</DialogTitle>
                                </DialogHeader>
                                <DialogDescription></DialogDescription>
                                <div>
                                    <img src={progForWin} alt="Program for Windows" width="600px" className="rounded-lg"/>
                                    <div className="mt-3">
                                        <p>Программа знаходиться в розробці! Це урізана копія web-додатку
                                        написана на Python з використанням бібліотеки flet</p>
                                        <Button className="mt-2 cursor-pointer" disabled={true} variant="outline">Завантажити</Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div>
                        <img src={homeScreen} alt="Home Screen" width="900px"/>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-6">
                    <div>
                        <h1 className="font-bold text-2xl">Цільова аудиторія</h1>
                    </div>
                    <div>
                        <div>
                            <h3 className="font-bold">Школярі</h3>
                            <nav>
                                <ul className="list-disc ml-9">
                                    <li>Навички та рівень підготовки: Базові знання про комп'ютер мало знайомі з
                                        програмуванням.
                                    </li>
                                    <li>Особливості навчання: Краще сприймають візуальний, ігровий формат та прості
                                        завдання.
                                    </li>
                                    <li>Рекомендації: використовувати візуальні блоки, поступове ускладнення, елементи
                                        гейміфікації.
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="mt-3">
                            <h3 className="font-bold">Студенти технікумів</h3>
                            <nav>
                                <ul className="list-disc ml-9">
                                    <li>Навички та рівень підготовки: Базова технічна підготовка, можливо, знайома з
                                        основами алгоритмів.
                                    </li>
                                    <li>Особливості навчання: Цінують практичне застосування знань, готові досліджувати
                                        текстове програмування.
                                    </li>
                                    <li>Рекомендації: Покрокові завдання з акцентом на практику, глибше вивчення основ
                                        програмування.
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="mt-3">
                            <h3 className="font-bold">Дорослі без досвіду</h3>
                            <nav>
                                <ul className="list-disc ml-9">
                                    <li>Навички та рівень підготовки: Хороша комп'ютерна грамотність, але немає досвіду програмування.
                                    </li>
                                    <li>Навички та рівень підготовки: Хороша комп'ютерна грамотність, але немає досвіду програмування.</li>
                                    <li>Рекомендації: Покрокове навчання з упором на практичні завдання та самостійне вивчення.</li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-6">
                    <div className="flex flex-col gap-2">
                        <div>
                            <h1 className="font-bold text-2xl">Структура курсу</h1>
                        </div>
                        <div>
                            <p>Сайт має зручну структуру курсу</p>
                        </div>
                    </div>
                    <div>
                        <img src={courseStruct} alt="CoursePage Struct" width="800px" />
                    </div>
                </div>
                <div className="flex justify-between items-center pt-6">
                    <div className="flex flex-col gap-2">
                        <div>
                            <h1 className="font-bold text-2xl">Завдання</h1>
                        </div>
                        <div>
                            <p>Інтерактивна система проходження тестів</p>
                        </div>
                    </div>
                    <div>
                        <img src={exercise} alt="CoursePage Struct" width="800px" />
                    </div>
                </div>
                <div className="flex justify-between items-center pt-6">
                    <div className="flex flex-col gap-2">
                        <div className="w-96">
                            <h1 className="font-bold text-2xl">Зручний особистий кабінет для перегляду успішності</h1>
                        </div>
                    </div>
                    <div>
                        <img src={stat} alt="CoursePage Struct" width="750px" />
                    </div>
                </div>
                <div className="flex justify-between items-center pt-6">
                    <div className="flex flex-col gap-2">
                        <div>
                            <h1 className="font-bold text-2xl">Система рівнів як частина гейміфікації</h1>
                        </div>
                        <div>
                            <p>Підтримка рівнів. Проходь тести отримуючи бали та бейджі</p>
                        </div>
                    </div>
                    <div>
                        <img src={level} alt="CoursePage Struct" width="750px" />
                    </div>
                </div>
            </div>
        </PageBody>
    );
};

export default Home;