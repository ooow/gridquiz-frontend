import {FAILED_FETCHING_MINI_QUIZZES, FailedFetchingMiniQuizzes, RECEIVE_MINI_QUIZZES, ReceiveMiniQuizzes, REQUEST_MINI_QUIZZES, RequestMiniQuizzes} from './types';
import MiniQuiz from '../../model/MiniQuiz';

export function requestMiniQuizzes(): RequestMiniQuizzes {
    return {type: REQUEST_MINI_QUIZZES};
}

export function receiveMiniQuizzes(miniQuizzes: Array<MiniQuiz>): ReceiveMiniQuizzes {
    return {
        type: RECEIVE_MINI_QUIZZES,
        miniQuizzes,
    };
}

export function failedFetchingMiniQuizzes(error: Error): FailedFetchingMiniQuizzes {
    return {
        type: FAILED_FETCHING_MINI_QUIZZES,
        error,
    };
}
