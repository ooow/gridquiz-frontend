import Question from './Question';

export default interface Quiz {
    id: string;
    name: string;
    description: string;
    color: string;
    questions: Question[];
}
