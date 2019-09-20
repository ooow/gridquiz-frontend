import MiniQuiz from '../../model/MiniQuiz';
import Progress from '../../model/Progress';
import {Answer} from '../../model/Answers';

export const FAILED_FETCHING_MINI_QUIZZES = 'FAILED_FETCHING_MINI_QUIZZES';
export const RECEIVE_MINI_QUIZZES = 'RECEIVE_MINI_QUIZZES';
export const REQUEST_MINI_QUIZZES = 'REQUEST_MINI_QUIZZES';

export const FAILED_FETCHING_PROGRESS = 'FAILED_FETCHING_PROGRESS';
export const START_PROGRESS = 'START_PROGRESS';
export const RECEIVE_PROGRESS = 'RECEIVE_PROGRESS';
export const CLEAN_PROGRESS = 'CLEAN_PROGRESS';
export const STORE_ANSWER = 'STORE_ANSWER';
export const NEXT_QUESTION = 'NEXT_QUESTION';

export interface QuizState {
    attempt?: Progress;
    currentColor?: string;
    error?: string;
    isFetching: boolean;
    miniQuizzes: Array<MiniQuiz>;
    progress?: Progress;
}

export type QuizActionTypes = FailedFetchingMiniQuizzes
    | ReceiveMiniQuizzes | RequestMiniQuizzes | ReceiveProgress
    | FailedFetchingProgress | StartProgress | StoreAnswer | NextQuestion;

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

export interface StartProgress {
    type: typeof START_PROGRESS;
}

export interface ReceiveProgress {
    type: typeof RECEIVE_PROGRESS;
    progress: Progress;
}

export interface FailedFetchingProgress {
    type: typeof FAILED_FETCHING_PROGRESS;
    error: string;
}

export interface StoreAnswer {
    type: typeof STORE_ANSWER;
    answer: Answer;
}

export interface NextQuestion {
    type: typeof NEXT_QUESTION;
    index: number;
}
