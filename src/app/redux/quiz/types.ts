import MiniQuiz from '../../model/MiniQuiz';

export const FAILED_FETCHING_MINI_QUIZZES = 'FAILED_FETCHING_MINI_QUIZZES';
export const RECEIVE_MINI_QUIZZES = 'RECEIVE_MINI_QUIZZES';
export const REQUEST_MINI_QUIZZES = 'REQUEST_MINI_QUIZZES';

export interface QuizState {
    error?: string;
    isFetching: boolean;
    miniQuizzes: Array<MiniQuiz>;
}

export type QuizActionTypes = FailedFetchingMiniQuizzes
    | ReceiveMiniQuizzes | RequestMiniQuizzes;

export interface RequestMiniQuizzes {
    type: typeof REQUEST_MINI_QUIZZES;
}

export interface ReceiveMiniQuizzes {
    type: typeof RECEIVE_MINI_QUIZZES;
    miniQuizzes: Array<MiniQuiz>;
}

export interface FailedFetchingMiniQuizzes {
    type: typeof FAILED_FETCHING_MINI_QUIZZES;
    error: string;
}
