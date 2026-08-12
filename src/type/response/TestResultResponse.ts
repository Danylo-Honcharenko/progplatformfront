import {AnswerResponse} from "@/type/response/AnswerResponse.ts";

type WrongAnswer = {
    question: string;
    correctAnswer: string;
}

export type TestResult = {
    maxAssessment: number;
    currentAssessment: number;
    correctAnswers: AnswerResponse[];
    wrongAnswers: WrongAnswer[];
    created: string;
}

export type TestResultResponse = {
    results: TestResult[];
}