import {FAILED_FETCHING_MINI_QUIZZES, MiniQuizActionTypes, MiniQuizState, RECEIVE_MINI_QUIZZES, REQUEST_MINI_QUIZZES} from './types';

const initState: MiniQuizState = {
    isFetching: false,
    miniQuizzes: Array(0),
};

export function miniQuizReducer(state = initState, action: MiniQuizActionTypes): MiniQuizState {
    switch (action.type) {
        case RECEIVE_MINI_QUIZZES:
            return {
                ...state,
                isFetching: false,
                miniQuizzes: action.miniQuizzes,
                error: undefined,
            };
        case REQUEST_MINI_QUIZZES:
            return {...state, isFetching: true};
        case FAILED_FETCHING_MINI_QUIZZES:
            return {...state, isFetching: false, error: action.error};
        default:
            return state;
    }
}
