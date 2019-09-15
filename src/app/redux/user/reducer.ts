import {FAILED_FETCHING_USER, LOGOUT, RECEIVE_USER, REQUEST_USER, UserActionTypes, UserState} from './types';

const initState = {
    isFetching: false,
};

export function userReducer(state = initState, action: UserActionTypes): UserState {
    switch (action.type) {
        case RECEIVE_USER:
            return {
                ...state,
                isFetching: false,
                user: action.user,
                error: undefined,
            };
        case REQUEST_USER:
            return {...state, isFetching: true};
        case FAILED_FETCHING_USER:
            return {
                ...state,
                isFetching: false,
                error: action.error,
            };
        case LOGOUT:
            return {
                ...state,
                user: undefined,
            };
        default:
            return state;
    }
}
