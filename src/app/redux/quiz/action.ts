import MiniQuiz from '../../model/MiniQuiz';
import Attempt from '../../model/Attempt';
import {FAILED_FETCHING_ATTEMPT, FAILED_FETCHING_MINI_QUIZZES, FailedFetchingAttempt, FailedFetchingMiniQuizzes, RECEIVE_ATTEMPT, RECEIVE_MINI_QUIZZES, ReceiveAttempt, ReceiveMiniQuizzes, REQUEST_ATTEMPT, REQUEST_MINI_QUIZZES, RequestAttempt, RequestMiniQuizzes} from './types';

// MINI QUIZZES
export function requestMiniQuizzes(): RequestMiniQuizzes {
    return {type: REQUEST_MINI_QUIZZES};
}

export function receiveMiniQuizzes(miniQuizzes: Array<MiniQuiz>): ReceiveMiniQuizzes {
    return {type: RECEIVE_MINI_QUIZZES, miniQuizzes};
}

export function failedFetchingMiniQuizzes(error: string): FailedFetchingMiniQuizzes {
    return {type: FAILED_FETCHING_MINI_QUIZZES, error};
}

// Attempt
export function requestAttempt(): RequestAttempt {
    return {type: REQUEST_ATTEMPT};
}

export function receiveAttempt(attempt: Attempt): ReceiveAttempt {
    return {type: RECEIVE_ATTEMPT, attempt};
}

export function failedFetchingAttempt(error: string): FailedFetchingAttempt {
    return {type: FAILED_FETCHING_ATTEMPT, error};
}
