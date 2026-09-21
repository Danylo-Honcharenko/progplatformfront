import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import useAuth from "@/hooks/useAuth.tsx";

const Header = () => {

    const {notAuthorized, loadingUser} = useAuth();

    return (
        <header className="flex items-center justify-between pl-44 pr-44 pt-4 pb-3">
            <div>
                <h2 className="font-bold text-xl">ProgPlatform</h2>
            </div>
            <div>
                {loadingUser ? <p>Loading...</p>
                    :
                    <>
                        <Button asChild><Link
                            to={!notAuthorized ? "/panel" : "/login"}
                        >{!notAuthorized ? "Перейти до кабінету користувача" : "Увійти"}</Link></Button>
                    </>
                }
            </div>
        </header>
    );
};

export default Header;