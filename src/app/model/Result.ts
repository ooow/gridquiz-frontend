export default interface Result {
    userId: string;
    quizId: string;
    startTime: string;
    endTime: string;
    seconds: number;
    points: number;
    outOf: number;
    approved: boolean;
}
