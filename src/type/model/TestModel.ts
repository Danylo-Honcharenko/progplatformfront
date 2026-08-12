import {QuestionResponse} from "@/type/response/QuestionResponse.ts";

export type TestModel = {
    uuid: string;
    topicId: number;
    name: string;
    questions: QuestionResponse[];
    created: string;
    updated: string;
}