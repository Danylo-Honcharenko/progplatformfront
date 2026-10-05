import {useContext, useState} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {AlertCircleIcon, ArrowLeft, ChevronDown, Home, LogOut, User} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {Link, Navigate} from "react-router-dom";
import {UserService} from "@/services/UserService.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {AuthContext} from "@/AuthProvider.tsx";

const PanelHeader = () => {

    const [isLogout, setIsLogout] = useState<boolean>(false);
    const authContext = useContext(AuthContext);

    const logout = async () => {
        try {
            const userService = new UserService();
            await userService.logout();

            authContext?.setAuthUser({
                loading: false,
                user: undefined,
                authError: undefined,
                notAuthorized: true
            });

            setIsLogout(true);

            localStorage.removeItem("tokenExpirationDate");
        } catch (error) {
            console.log(error);
        }
    }

    if (isLogout) return <Navigate to="/login" replace/>;

    return (
        <>
            <div className="flex items-center justify-between px-14 pt-3">
                <div>
                    <h2 className="text-xl">Панель користувача</h2>
                </div>
                <div>
                    {authContext?.authUser.authError ?
                        <div className="flex items-center gap-2 text-sm text-red-600 font-medium">
                            <AlertCircleIcon />
                            <p>Помилка</p>
                        </div>
                        :
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='ghost' className="cursor-pointer">{authContext?.authUser.loading ? <Skeleton className="w-16 h-5 rounded-lg"/> : authContext?.authUser.user?.data?.lastName + " " + authContext?.authUser.user?.data?.firstName}<ChevronDown /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel><Badge>{authContext?.authUser.user?.data?.levelAlias}</Badge>Рівень: {authContext?.authUser.user?.data?.level}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <Link to="user-profile">
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
                                    <Link to="/">
                                        <DropdownMenuItem>
                                            <Home/><span>На головну</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link to="/panel" replace>
                                        <DropdownMenuItem>
                                            <ArrowLeft/><span>До панелі користувача</span>
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
                </div>
            </div>
            <Separator className="mt-2"/>
        </>
    );
};

export default PanelHeader;
