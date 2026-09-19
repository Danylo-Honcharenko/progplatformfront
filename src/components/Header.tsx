import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";
import {Response} from "@/type/response/Response.ts";
import {UserResponse} from "@/type/response/UserResponse.ts";
import {ErrorResponse} from "@/type/response/ErrorResponse.ts";
import {UserService} from "@/services/UserService.ts";

const Header = () => {

    const [user, setUser] = useState<Response<UserResponse> | undefined>(undefined);
    const [_, setError] = useState<Response<ErrorResponse<string>> | undefined>(undefined);

    const getAuthUser = async () => {
        try {
            const userService = new UserService();
            const response = await userService.getAuthUser();
            setUser(response);
        } catch (error) {
            setError(error as Response<ErrorResponse<string>>);
            console.log(error);
        }
    }

    useEffect(() => {
        getAuthUser().then();
    }, []);

    const isUserLogin = user?.status === 200;
    const buttonLink = isUserLogin ? "/user" : "/login";
    const buttonText = isUserLogin ? "Перейти до кабінету користувача" : "Увійти";

    return (
        <header className="flex items-center justify-between pl-44 pr-44 pt-4 pb-3">
            <div>
                <h2 className="font-bold text-xl">ProgPlatform</h2>
            </div>
            <div>
                <Button asChild><Link to={buttonLink}>{buttonText}</Link></Button>
            </div>
        </header>
    );
};

export default Header;