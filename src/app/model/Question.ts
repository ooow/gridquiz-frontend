export default interface Question {
    id: string;
    text: string;
    code: string;
    answers: string[];
}

export interface NewQuestion {
    text: string;
    code: string | undefined;
    correctAnswer: string;
    answers: string[];
}

