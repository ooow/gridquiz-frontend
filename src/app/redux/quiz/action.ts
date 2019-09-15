import {FAILED_FETCHING_MINI_QUIZZES, FAILED_FETCHING_QUIZ, FailedFetchingMiniQuizzes, FailedFetchingQuiz, RECEIVE_MINI_QUIZZES, RECEIVE_QUIZ, ReceiveMiniQuizzes, ReceiveQuiz, REQUEST_MINI_QUIZZES, REQUEST_QUIZ, RequestMiniQuizzes, RequestQuiz} from './types';
import MiniQuiz from '../../model/MiniQuiz';
import Quiz from '../../model/Quiz';

// MINI QUIZZES
export function requestMiniQuizzes(): RequestMiniQuizzes {
    return {type: REQUEST_MINI_QUIZZES};
}

export function receiveMiniQuizzes(miniQuizzes: Array<MiniQuiz>): ReceiveMiniQuizzes {
    return {
        type: RECEIVE_MINI_QUIZZES,
        miniQuizzes,
    };
}

export function failedFetchingMiniQuizzes(error: string): FailedFetchingMiniQuizzes {
    return {
        type: FAILED_FETCHING_MINI_QUIZZES,
        error,
    };
}

// QUIZ
export function requestQuiz(): RequestQuiz {
    return {type: REQUEST_QUIZ};
}

export function receiveQuiz(quiz: Quiz): ReceiveQuiz {
    return {
        type: RECEIVE_QUIZ,
        quiz,
    };
}

export function failedFetchingQuiz(error: string): FailedFetchingQuiz {
    return {
        type: FAILED_FETCHING_QUIZ,
        error,
    };
}
