import {TestModel} from "./TestModel";
import {ExerciseModel} from "@/type/model/ExerciseModel.ts";

export type TopicModel = {
    id: number;
    name: string;
    description: string;
    moduleId: number;
    done: boolean;
    tests: TestModel[];
    exercise: ExerciseModel;
    created: string;
    updated: string;
}