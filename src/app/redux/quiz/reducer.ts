import {FAILED_FETCHING_MINI_QUIZZES, FAILED_FETCHING_QUIZ, QuizActionTypes, QuizState, RECEIVE_MINI_QUIZZES, RECEIVE_QUIZ, REQUEST_MINI_QUIZZES, REQUEST_QUIZ} from './types';

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
        case RECEIVE_QUIZ:
            return {
                ...state,
                isFetching: false,
                quiz: action.quiz,
                error: undefined,
            };
        case REQUEST_MINI_QUIZZES:
        case REQUEST_QUIZ:
            return {...state, isFetching: true};
        case FAILED_FETCHING_MINI_QUIZZES:
        case FAILED_FETCHING_QUIZ:
            return {
                ...state,
                isFetching: false,
                error: action.error,
            };
        default:
            return state;
    }
}
