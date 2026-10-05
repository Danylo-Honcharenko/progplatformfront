import {Button} from "@/components/ui/button.tsx";
import {ModuleModel} from "@/type/model/ModuleModel.ts";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Link} from "react-router-dom";

type Props = {
    module: ModuleModel
    courseName: any
};

const Module = ({module, courseName}: Props) => {
    return (
        <Card className="w-full justify-between xl:min-h-80 xl:max-w-sm">
            <CardHeader>
                <CardTitle>{module.name} ({module.complete}%)</CardTitle>
                <CardDescription>
                    {module.description}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button asChild variant="outline">
                    <Link
                        to={`module/${module.id}/topic?page=1`}
                        className="w-full"
                        state={{moduleName: module.name, courseName: courseName}}
                    >
                        Перейти
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default Module;