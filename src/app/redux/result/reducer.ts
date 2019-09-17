import {FAILED_SUBMITTING_ANSWERS, RECEIVE_RESULT, ResultActionTypes, ResultState, SUBMIT_ANSWERS} from './types';

const initState: ResultState = {
    isFetching: false,
};

export function resultReducer(state = initState, action: ResultActionTypes): ResultState {
    switch (action.type) {
        case RECEIVE_RESULT:
            return {
                ...state,
                isFetching: false,
                result: action.result,
                error: undefined,
            };
        case SUBMIT_ANSWERS:
            return {...state, isFetching: true};
        case FAILED_SUBMITTING_ANSWERS:
            return {
                ...state,
                isFetching: false,
                error: action.error,
            };
        default:
            return state;
    }
}
