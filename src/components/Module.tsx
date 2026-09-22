import {Button} from "@/components/ui/button.tsx";
import {ModuleModel} from "@/type/model/ModuleModel.ts";
import {Link} from "react-router-dom";

const Module = ({module}: {module: ModuleModel}) => {
    return (
        <div className="flex flex-col gap-5">
            <div
                className="flex flex-col gap-6 p-5 shadow-lg rounded-lg w-[410px] justify-between h-80">
                <div className="flex items-start justify-between">
                    <div>
                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{module.name}</h4>
                    </div>
                    <div>
                        <p>{module.complete}%</p>
                    </div>
                </div>
                <p>{module.description}</p>
                <Link to={`/topics/${module.id}`}>
                    <Button
                        variant="outline"
                        className="cursor-pointer w-full"
                        disabled={module.topics.length === 0}
                        onClick={() => {
                            // setTopics(module.topics);
                            // setOpen(true);
                            // setTopic(module.topics[0]);
                            // setModule(module);
                        }}
                    >Перейти</Button>
                </Link>
            </div>
        </div>
    );
};

export default Module;