import {CLEAN_PROGRESS, FAILED_FETCHING_PROGRESS, ProgressActionTypes, ProgressState, RECEIVE_PROGRESS, START_PROGRESS, UPDATE_PROGRESS} from './types';

const initState: ProgressState = {
    isFetching: false,
    isFinished: false,
};

export function progressReducer(state = initState, action: ProgressActionTypes): ProgressState {
    switch (action.type) {
        case RECEIVE_PROGRESS:
            return {
                ...state,
                isFetching: false,
                progress: {
                    ...action.progress,
                    question: action.progress.quiz.questions[0],
                    questionIndex: 0,
                    answers: [],
                },
                currentColor: action.progress.quiz.color,
                error: undefined,
            };
        case UPDATE_PROGRESS:
            if (action.progress.quiz.questions.length === action.progress.answers.length) {
                // After last answer.
                return {
                    ...state,
                    progress: action.progress,
                    isFetching: false,
                    isFinished: true,
                };
            }
            return {...state, progress: action.progress};
        case CLEAN_PROGRESS:
            return {
                currentColor: state.currentColor,
                isFetching: false,
                isFinished: false,
            };
        case START_PROGRESS:
            return {...state, isFetching: true, isFinished: false};
        case FAILED_FETCHING_PROGRESS:
            return {...state, isFetching: false, error: action.error};
        default:
            return state;
    }
}
