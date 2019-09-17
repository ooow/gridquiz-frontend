import {FAILED_FETCHING_ATTEMPT, FAILED_FETCHING_MINI_QUIZZES, QuizActionTypes, QuizState, RECEIVE_ATTEMPT, RECEIVE_MINI_QUIZZES, REQUEST_ATTEMPT, REQUEST_MINI_QUIZZES} from './types';

const initState = {
    isFetching: false,
    miniQuizzes: Array(0),
};

export function quizReducer(state = initState, action: QuizActionTypes): QuizState {
    switch (action.type) {
        case RECEIVE_MINI_QUIZZES:
            return {
                ...state,
                isFetching: false,
                miniQuizzes: action.miniQuizzes,
                error: undefined,
            };
        case RECEIVE_ATTEMPT:
            return {
                ...state,
                isFetching: false,
                attempt: action.attempt,
                error: undefined,
            };
        case REQUEST_MINI_QUIZZES:
        case REQUEST_ATTEMPT:
            return {...state, isFetching: true};
        case FAILED_FETCHING_MINI_QUIZZES:
        case FAILED_FETCHING_ATTEMPT:
            return {
                ...state,
                isFetching: false,
                error: action.error,
            };
        default:
            return state;
    }
}
