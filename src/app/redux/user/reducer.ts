import {FAILED_FETCHING_USER, LOGOUT, RECEIVE_USER, REQUEST_USER, TOGGLE_LOGIN_DIALOG, UserActionTypes, UserState} from './types';
import LocalStoreService, {userTokenKey} from '../../services/LocalStoreService';
import {User} from '../../model/User';

const initState: UserState = {
    isFetching: false,
    showAuthDialog: false,
    user: LocalStoreService.read<User>(userTokenKey),
};

export function userReducer(state = initState, action: UserActionTypes): UserState {
    switch (action.type) {
        case RECEIVE_USER:
            LocalStoreService.write(userTokenKey, action.user);
            return {
                ...state,
                isFetching: false,
                showAuthDialog: false,
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
        case TOGGLE_LOGIN_DIALOG:
            return {
                ...state,
                showAuthDialog: !state.showAuthDialog,
            };
        default:
            return state;
    }
}
