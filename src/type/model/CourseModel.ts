import {ModuleModel} from "@/type/model/ModuleModel.ts";

export type CourseModel = {
    id: number;
    name: string;
    description: string;
    created: string;
    updated: string;
    modules: ModuleModel[];
}