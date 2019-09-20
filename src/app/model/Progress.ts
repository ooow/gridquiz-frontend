import Quiz from './Quiz';
import Question from './Question';
import {Answer} from './Answers';

export default interface Progress {
    quiz: Quiz;
    question: Question;
    answers: Answer[];
    start: string;
}
