export default interface MiniQuiz {
    id: string;
    name: string;
    description: string;
    color: string;
    questionsSize: number;
    questionsComplete?: number;
    attempt?: boolean;
}
