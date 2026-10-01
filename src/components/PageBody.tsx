import {JSX} from 'react';
import Header from "./Header.tsx";
import {Separator} from "@/components/ui/separator.tsx";

type Props = {
    children: JSX.Element[] | JSX.Element;
}

const PageBody = ({children}: Props) => {
    return (
        <>
            <Header />
            <div className="px-14">
                {children}
            </div>
            <footer className="px-14 p-4">
                <Separator />
                <div className="flex flex-col gap-3 mt-4">
                    <div>
                        <p>PyLearn</p>
                    </div>
                    <div>
                        <p className="w-80 text-gray-400">Сайт розроблено студентом групи КС-21-1 Гончаренко Данило у 2025 році</p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default PageBody;