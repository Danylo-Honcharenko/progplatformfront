import {Button} from "@/components/ui/button.tsx";
import {ModuleModel} from "@/type/model/ModuleModel.ts";

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
                <Button
                    variant="outline"
                    className="cursor-pointer"
                    disabled={module.topics.length === 0}
                    onClick={() => {
                    // setTopics(module.topics);
                    // setOpen(true);
                    // setTopic(module.topics[0]);
                    // setModule(module);
                    }}
                >Перейти</Button>
            </div>
        </div>
    );
};

export default Module;