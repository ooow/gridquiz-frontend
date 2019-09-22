export default interface Result {
    userId: string;
    quizId: string;
    seconds: number;
    points: number;
    outOf: number;
    place: number;
    highlighted: boolean;
}
