import {User} from '../../model/User';
import {FAILED_FETCHING_USER, FailedFetchingUser, LOGOUT, Logout, RECEIVE_USER, ReceiveUser, REQUEST_USER, RequestUser} from './types';

export function requestUser(): RequestUser {
    return {type: REQUEST_USER};
}

export function receiveUser(user: User): ReceiveUser {
    return {
        type: RECEIVE_USER,
        user,
    };
}

export function failedFetchingUser(error: string): FailedFetchingUser {
    return {
        type: FAILED_FETCHING_USER,
        error,
    };
}

export function logout(): Logout {
    return {type: LOGOUT};
}
