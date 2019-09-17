export default interface Result {
    userId: string;
    quizId: string;
    startTime: Date;
    endTime: Date;
    points: number;
    outOf: number;
    approved: boolean;
}
