import useAuth from "@/hooks/useAuth.tsx";
import {Badge} from "lucide-react";
import {Navigate} from "react-router-dom";

const UserProfile = () => {

    const {user, notAuthorized} = useAuth();

    if (notAuthorized) return <Navigate to="/login" replace/>;

    return (
        <div>
            <div className="mt-3 bg-zinc-50 p-3 rounded-lg">
                <h4 className="scroll-m-20 text-2xl tracking-tight">{user?.data.lastName} {user?.data.firstName}</h4>
                <p className="mt-2">{user?.data.email}</p>
            </div>
            <div className="mt-4 bg-zinc-50 p-3 rounded-lg">
                <div>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Рівні та система
                        балів</h3>
                </div>
                <div className="mt-2">
                    <p>Ваш поточний
                        рівень: {user?.data.level} <Badge>{user?.data.levelAlias}</Badge></p>
                </div>
                <div className="mt-2">
                    <h3 className="text-xl">Можливі рівнів</h3>
                </div>
                <div className="flex text-black gap-4 mt-4">
                    <div
                        className="text-center bg-zinc-100 w-40 h-32 flex flex-col items-center justify-center rounded-lg">
                        <p>Новачок</p>
                    </div>
                    <div
                        className="text-center bg-zinc-100 w-40 h-32 flex flex-col items-center justify-center rounded-lg">
                        <p>Професіонал</p>
                    </div>
                    <div
                        className="text-center bg-zinc-100 w-45 h-32 flex flex-col items-center justify-center rounded-lg">
                        <p>Програміст-любитель</p>
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-gray-500 text-sm">*За проходження кожного тесту вам
                        надаються бали вони ж і є рівнем які визначають його назву.
                        Якщо ваш рівень менше 10 (початковий) то ви отримуєте бейдж "Новачок",
                        більше 10 але менше 20 то ви
                        отримуєте бейдж "Програміст-любитель", більше 20 то ви отримуєте бейдж
                        "Професіонал"</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;