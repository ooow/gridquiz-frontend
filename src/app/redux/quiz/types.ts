import MiniQuiz from '../../model/MiniQuiz';
import Attempt from '../../model/Attempt';

export const FAILED_FETCHING_MINI_QUIZZES = 'FAILED_FETCHING_MINI_QUIZZES';
export const RECEIVE_MINI_QUIZZES = 'RECEIVE_MINI_QUIZZES';
export const REQUEST_MINI_QUIZZES = 'REQUEST_MINI_QUIZZES';

export const FAILED_FETCHING_ATTEMPT = 'FAILED_FETCHING_ATTEMPT';
export const RECEIVE_ATTEMPT = 'RECEIVE_ATTEMPT';
export const REQUEST_ATTEMPT = 'REQUEST_ATTEMPT';

export interface QuizState {
    isFetching: boolean,
    miniQuizzes: Array<MiniQuiz>,
    attempt?: Attempt,
    error?: string,
}

export type QuizActionTypes = FailedFetchingMiniQuizzes
    | ReceiveMiniQuizzes | RequestMiniQuizzes | RequestAttempt | ReceiveAttempt
    | FailedFetchingAttempt;

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

export interface RequestAttempt {
    type: typeof REQUEST_ATTEMPT;
}

export interface ReceiveAttempt {
    type: typeof RECEIVE_ATTEMPT;
    attempt: Attempt;
}

export interface FailedFetchingAttempt {
    type: typeof FAILED_FETCHING_ATTEMPT;
    error: string;
}
