import {Navigate} from "react-router-dom";
import ErrorDialog from "@/components/ErrorDialog.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Item, ItemContent, ItemDescription, ItemMedia, ItemTitle} from "@/components/ui/item.tsx";
import {Medal} from "lucide-react";
import {useContext} from "react";
import {AuthContext} from "@/components/AuthProvider.tsx";

const UserProfile = () => {

    const authContext = useContext(AuthContext);


    if (authContext?.notAuthorized) return <Navigate to="/login" replace/>;

    type Level = {
        levelName: string,
        levelDescription: string,
    };

    const levels: Level[] = [
        {
            levelName: "Новачок",
            levelDescription: "Ваш рівень менше 10",
        },
        {
            levelName: "Професіонал",
            levelDescription: "Ваш рівень більше 10 але менше 20",
        },
        {
            levelName: "Програміст-любитель",
            levelDescription: "Ваш рівень більше 20",
        }
    ];

    return (
        <div>
            <div className="mt-3">
                    {authContext?.loadingUser ? (
                    <>
                        <Skeleton className="h-8 w-56" />
                        <Skeleton className="mt-2 h-5 w-48" />
                    </>
                ) : (
                    <>
                        <h3 className="scroll-m-20 text-xl tracking-tight">{authContext?.user?.data.lastName} {authContext?.user?.data.firstName}</h3>
                        <p className="mt-2">{authContext?.user?.data.email}</p>
                    </>
                )}
            </div>
            <div className="mt-4">
                <div>
                    <h3 className="scroll-m-20 text-2xl font-medium tracking-tight">Рівні та система
                        балів</h3>
                    <p className="text-gray-500 text-sm">*За проходження кожного тесту вам надаються бали вони ж і є рівнем які визначають його назву.</p>
                </div>
                <div className="flex text-black gap-4 mt-4">
                    {levels.map(({levelName, levelDescription}, index) => (
                        <Item variant={levelName === authContext?.user?.data.levelAlias ? "outline" : "muted"} key={index} className="min-w-3xs">
                            <ItemMedia variant="icon">
                                <Medal />
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle>{levelName} {levelName === authContext?.user?.data.levelAlias ? "(Поточний)" : ""}</ItemTitle>
                                <ItemDescription>{levelDescription}</ItemDescription>
                            </ItemContent>
                        </Item>
                    ))}
                </div>
            </div>

            <ErrorDialog
                errors={[authContext?.authError]}
            />

        </div>
    );
};

export default UserProfile;
