import Quiz from './Quiz';
import Question from './Question';
import {Answer} from './Answers';

export default interface Progress {
    quiz: Quiz;
    question: Question;
    questionIndex: number;
    answers: Answer[];
    start: string;
    userId: string;
}
