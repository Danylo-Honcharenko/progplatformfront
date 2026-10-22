import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {AlertCircleIcon, ChevronDown, Home, LogOut, User} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {Link} from "react-router-dom";
import {Separator} from "@/components/ui/separator.tsx";
import useAuthContext from "@/hooks/useAuthContext.tsx";

const PanelHeader = () => {

    const {authUser, logout} = useAuthContext();

    return (
        <>
            <div className="flex items-center justify-between px-14 pt-3">
                <div>
                    <h2 className="text-xl">Панель користувача</h2>
                </div>
                <div>
                    {authUser.authError ?
                        <div className="flex items-center gap-2 text-sm text-red-600 font-medium">
                            <AlertCircleIcon />
                            <p>Помилка</p>
                        </div>
                        :
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='ghost' className="cursor-pointer">{authUser.loading ? <Skeleton className="w-16 h-5 rounded-lg"/> : authUser.user?.data?.lastName + " " + authUser.user?.data?.firstName}<ChevronDown /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel><Badge>{authUser.user?.data?.levelAlias}</Badge>Рівень: {authUser.user?.data?.level}</DropdownMenuLabel>
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
