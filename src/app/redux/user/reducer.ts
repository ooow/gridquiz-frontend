import {FAILED_FETCHING_USER, LOGOUT, RECEIVE_USER, REQUEST_USER, UserActionTypes, UserState} from './types';
import LocalStoreService, {userTokenKey} from '../../services/LocalStoreService';
import {UserToken} from '../../model/User';

const initState = {
    isFetching: false,
    userToken: LocalStoreService.read<UserToken>(userTokenKey),
};

export function userReducer(state = initState, action: UserActionTypes): UserState {
    switch (action.type) {
        case RECEIVE_USER:
            LocalStoreService.write(userTokenKey, action.userToken);
            return {
                ...state,
                isFetching: false,
                userToken: action.userToken,
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
                userToken: undefined,
            };
        default:
            return state;
    }
}
