export default interface Result {
    userId: string;
    quizId: string;
    startTime: string;
    endTime: string;
    points: number;
    outOf: number;
    approved: boolean;
}
