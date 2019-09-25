import Question, {NewQuestion} from './Question';

export default interface Quiz {
    id: string;
    name: string;
    description: string;
    color: string;
    questions: Question[];
}

export interface NewQuiz {
    name: string;
    description: string;
    color: string;
    questions: NewQuestion[];
}
