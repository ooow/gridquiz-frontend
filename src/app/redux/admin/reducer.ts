import {AdminActionTypes, AdminState, FAILED_FETCHING_USERS, RECEIVE_USERS, REQUEST_USERS} from './types';

const initState: AdminState = {
    isFetching: false,
};

export function adminReducer(state = initState, action: AdminActionTypes): AdminState {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                isFetching: false,
                users: action.users,
                error: undefined,
            };
        case REQUEST_USERS:
            return {...state, isFetching: true};
        case FAILED_FETCHING_USERS:
            return {
                ...state,
                isFetching: false,
                error: action.error,
            };
        default:
            return state;
    }
}
