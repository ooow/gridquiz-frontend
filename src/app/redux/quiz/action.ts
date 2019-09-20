import {FAILED_FETCHING_MINI_QUIZZES, FAILED_FETCHING_PROGRESS, FailedFetchingMiniQuizzes, FailedFetchingProgress, NEXT_QUESTION, NextQuestion, RECEIVE_MINI_QUIZZES, RECEIVE_PROGRESS, ReceiveMiniQuizzes, ReceiveProgress, REQUEST_MINI_QUIZZES, RequestMiniQuizzes, START_PROGRESS, StartProgress, STORE_ANSWER, StoreAnswer} from './types';
import MiniQuiz from '../../model/MiniQuiz';
import Progress from '../../model/Progress';
import {Answer} from '../../model/Answers';

// Mini Quizzes
export function requestMiniQuizzes(): RequestMiniQuizzes {
    return {type: REQUEST_MINI_QUIZZES};
}

export function receiveMiniQuizzes(miniQuizzes: Array<MiniQuiz>): ReceiveMiniQuizzes {
    return {type: RECEIVE_MINI_QUIZZES, miniQuizzes};
}

export function failedFetchingMiniQuizzes(error: string): FailedFetchingMiniQuizzes {
    return {type: FAILED_FETCHING_MINI_QUIZZES, error};
}

// Progress
export function startProgress(): StartProgress {
    return {type: START_PROGRESS};
}

export function receiveProgress(progress: Progress): ReceiveProgress {
    return {type: RECEIVE_PROGRESS, progress};
}

export function storeAnswer(answer: Answer): StoreAnswer {
    return {type: STORE_ANSWER, answer};
}

export function nextQuestion(index: number): NextQuestion {
    return {type: NEXT_QUESTION, index};
}

export function failedFetchingProgress(error: string): FailedFetchingProgress {
    return {type: FAILED_FETCHING_PROGRESS, error};
}
