export interface Answers {
    quizId: string;
    answers: Answer[];
}

export interface Answer {
    questionId: string;
    answer: string;
}
