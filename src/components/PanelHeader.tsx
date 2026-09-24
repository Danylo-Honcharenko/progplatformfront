import {useState} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {ArrowLeft, ChevronDown, Home, LogOut, User} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {Link, Navigate} from "react-router-dom";
import {UserService} from "@/services/UserService.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {UserResponse} from "@/type/response/UserResponse.ts";
import {Response} from "@/type/response/Response.ts";

type Props = {
    user: Response<UserResponse> | undefined,
    loading: boolean
};

const PanelHeader = ({user, loading}: Props) => {

    const [isLogout, setIsLogout] = useState<boolean>(false);

    const logout = async () => {
        try {
            const userService = new UserService();
            await userService.logout();
            setIsLogout(true);
        } catch (error) {
            console.log(error);
        }
    }

    if (isLogout) return <Navigate to="/login" replace/>;

    return (
        <>
            <div className="flex items-center justify-between pl-35 pr-35 pt-3">
                <div>
                    <h2 className="text-xl">Панель користувача</h2>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='ghost' className="cursor-pointer">{loading ? <Skeleton className="w-16 h-5 rounded-lg"/> : user?.data.lastName + " " + user?.data.firstName}<ChevronDown /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel><Badge>{user?.data.levelAlias}</Badge>Рівень: {user?.data.level}</DropdownMenuLabel>
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
                </div>
            </div>
            <Separator className="mt-2"/>
        </>
    );
};

export default PanelHeader;