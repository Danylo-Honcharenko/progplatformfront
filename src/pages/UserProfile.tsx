import {useEffect, useState} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowLeft, ChevronDown, Home, LogOut} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {Link, Navigate} from "react-router-dom";
import {userService} from "@/services/userService.ts";
import {responseUserDataHandler} from "@/utils/responseUserDataHandler.ts";
import {Response} from "@/type/response/Response.ts";
import {UserResponse} from "@/type/response/UserResponse.ts";
import {ErrorResponse} from "@/type/response/ErrorResponse.ts";
import {Separator} from "@/components/ui/separator.tsx";

const UserProfile = () => {

    const [user, setUser] = useState<Response<UserResponse> | undefined>(undefined);
    const [error, setError] = useState<Response<ErrorResponse<string>> | undefined>(undefined);
    const [isLogout, setLogout] = useState<boolean>(false);

    useEffect(() => {
        userService.checkIsAuthUser()
            .then(res => responseUserDataHandler(res.data, (userRespData: Response<UserResponse>) => setUser(userRespData)))
            .catch((err) => setError(err.response))
    }, [isLogout]);

    if (error !== undefined && error.status === 401) return <Navigate to="/login" replace/>;

    const logout = () => {
        userService.logout()
            .then(() => setLogout(true));
    }

    return (
        <div>
            <div className="pl-35 pr-35 pt-3">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl">Профіль користувача</h2>
                    </div>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='ghost'
                                        className="cursor-pointer">{user?.data.lastName} {user?.data.firstName}<ChevronDown/></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel><Badge>{user?.data.levelAlias}</Badge>Рівень: {user?.data.level}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={logout}>
                                        <LogOut/>
                                        <span>Вийти</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator/>
                                    <Link to="/" replace>
                                        <DropdownMenuItem>
                                            <Home/><span>На головну</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link to="/user" replace>
                                        <DropdownMenuItem>
                                            <ArrowLeft /><span>До особистого кабінету</span>
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <Separator className="mt-2"/>
                <div>
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
                </div>
            </div>
        </div>
    );
};

export default UserProfile;