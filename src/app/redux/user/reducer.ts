import {FAILED_FETCHING_USER, LOGOUT, RECEIVE_USER, REQUEST_USER, UserActionTypes, UserState} from './types';
import LocalStoreService, {userTokenKey} from '../../services/LocalStoreService';
import {User} from '../../model/User';

const initState = {
    isFetching: false,
    user: LocalStoreService.read<User>(userTokenKey),
};

export function userReducer(state = initState, action: UserActionTypes): UserState {
    switch (action.type) {
        case RECEIVE_USER:
            LocalStoreService.write(userTokenKey, action.user);
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
            LocalStoreService.remove(userTokenKey);
            return {
                ...state,
                user: undefined,
            };
        default:
            return state;
    }
}
