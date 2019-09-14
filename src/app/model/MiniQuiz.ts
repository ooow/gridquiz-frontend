export default interface MiniQuiz {
    id: string;
    name: string;
    description: string;
    colors: string[];
    questionsSize: number;
    questionsComplete?: number;
    attempt?: boolean;
}
