import MiniQuiz from './MiniQuiz';
import Result from './Result';

export interface Dashboard {
    miniQuiz: MiniQuiz;
    results: Result[];
}

