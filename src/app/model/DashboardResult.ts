import MiniQuiz from './MiniQuiz';
import Result from './Result';

export interface DashboardResult {
    miniQuiz: MiniQuiz;
    top5results: Result[];
    currentUserResult: Result;
}

