import MiniQuiz from '../../model/MiniQuiz';
import Quiz from '../../model/Quiz';

export const FAILED_FETCHING_MINI_QUIZZES = 'FAILED_FETCHING_MINI_QUIZZES';
export const RECEIVE_MINI_QUIZZES = 'RECEIVE_MINI_QUIZZES';
export const REQUEST_MINI_QUIZZES = 'REQUEST_MINI_QUIZZES';

export const FAILED_FETCHING_QUIZ = 'FAILED_FETCHING_QUIZ';
export const RECEIVE_QUIZ = 'RECEIVE_QUIZ';
export const REQUEST_QUIZ = 'REQUEST_QUIZ';

export interface QuizState {
    isFetching: boolean,
    miniQuizzes: Array<MiniQuiz>,
    quiz?: Quiz,
    error?: string,
}

export type QuizActionTypes = FailedFetchingMiniQuizzes
    | ReceiveMiniQuizzes | RequestMiniQuizzes | RequestQuiz | ReceiveQuiz
    | FailedFetchingQuiz;

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

export interface RequestQuiz {
    type: typeof REQUEST_QUIZ;
}

export interface ReceiveQuiz {
    type: typeof RECEIVE_QUIZ;
    quiz: Quiz;
}

export interface FailedFetchingQuiz {
    type: typeof FAILED_FETCHING_QUIZ;
    error: string;
}
