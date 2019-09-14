import {FAILED_FETCHING_MINI_QUIZZES, QuizActionTypes, QuizState, RECEIVE_MINI_QUIZZES, REQUEST_MINI_QUIZZES} from './types';

const initState = {
    isFetching: false,
    miniQuizzes: Array(0),
};

export function quizReducer(state = initState, action: QuizActionTypes): QuizState {
    switch (action.type) {
        case REQUEST_MINI_QUIZZES:
            return {...state, isFetching: true};
        case RECEIVE_MINI_QUIZZES:
            return {
                ...state,
                isFetching: false,
                miniQuizzes: action.miniQuizzes,
            };
        case FAILED_FETCHING_MINI_QUIZZES:
            return {
                ...state,
                isFetching: false,
                error: action.error,
            };
        default:
            return state;
    }
}
