import {FAILED_SAVING_QUIZ, QuizActionTypes, QuizState, RECEIVE_QUIZ, SAVE_QUIZ} from './types';

const initState: QuizState = {
    isFetching: false,
};

export function quizReducer(state = initState, action: QuizActionTypes): QuizState {
    switch (action.type) {
        case RECEIVE_QUIZ:
            return {
                ...state,
                isFetching: false,
                quiz: action.quiz,
                error: undefined,
            };
        case SAVE_QUIZ:
            return {
                ...state,
                isFetching: true,
                error: undefined,
            };
        case FAILED_SAVING_QUIZ:
            return {...state, isFetching: false, error: action.error};
        default:
            return state;
    }
}
