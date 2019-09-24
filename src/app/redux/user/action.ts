import {FAILED_FETCHING_USER, FailedFetchingUser, LOGOUT, Logout, RECEIVE_USER, ReceiveUser, REQUEST_USER, RequestUser, TOGGLE_LOGIN_DIALOG, ToggleAuthDialog} from './types';
import {User} from '../../model/User';

export function requestUser(): RequestUser {
    return {type: REQUEST_USER};
}

export function receiveUser(user: User): ReceiveUser {
    return {type: RECEIVE_USER, user: user};
}

export function failedFetchingUser(error: string): FailedFetchingUser {
    return {type: FAILED_FETCHING_USER, error};
}

export function logout(): Logout {
    return {type: LOGOUT};
}

export function toggleAuthDialog(): ToggleAuthDialog {
    return {type: TOGGLE_LOGIN_DIALOG};
}
