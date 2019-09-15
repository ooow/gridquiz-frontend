export enum QuestionType {
    TEXT,
    CODE,
    INPUT
}

export default interface Question {
    id: string;
    text: string;
    title: string;
    answers: string[];
    type: QuestionType;
}

