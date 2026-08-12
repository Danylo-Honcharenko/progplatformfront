import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";
import {Response} from "@/type/response/Response.ts";
import {UserResponse} from "@/type/response/UserResponse.ts";
import {ErrorResponse} from "@/type/response/ErrorResponse.ts";
import {userService} from "@/services/userService.ts";

const Header = () => {

    const [user, setUser] = useState<Response<UserResponse> | undefined>(undefined);
    const [error, setError] = useState<Response<ErrorResponse<string>> | undefined>(undefined);

    useEffect(() => {
        userService.checkIsAuthUser()
            .then((res) => setUser(res.data))
            .catch((err) => setError(err));
    }, []);

    error !== undefined ? console.log(error) : undefined;

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