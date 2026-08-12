import {TopicModel} from "@/type/model/TopicModel.ts";

export type ModuleModel = {
    id: number;
    name: string;
    description: string;
    topics: TopicModel[]
    complete: number;
}