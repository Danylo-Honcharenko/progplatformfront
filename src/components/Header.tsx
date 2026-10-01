import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";

const Header = () => {

    const tokenExpirationDate = localStorage.getItem("tokenExpirationDate");
    const [isAuth, setIsAuth] = useState<boolean>(false);

    useEffect(() => {
        if (tokenExpirationDate) {
            const expirationDate = new Date(tokenExpirationDate);
            const now = new Date();

            setIsAuth(now < expirationDate);
        }
    }, [tokenExpirationDate]);

    return (
        <header className="flex items-center justify-between px-14 pt-4 pb-3">
            <div>
                <h2 className="font-bold text-xl">ProgPlatform</h2>
            </div>
            <div>
                <Button asChild>
                    <Link to={isAuth ? "/panel" : "/login"}>
                        {isAuth ? "Перейти до кабінету користувача" : "Увійти"}
                    </Link>
                </Button>
            </div>
        </header>
    );
};

export default Header;