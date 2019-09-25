import {FAILED_FETCHING_USERS, FailedFetchingUsers, RECEIVE_USERS, ReceiveUsers, REQUEST_USERS, RequestUsers} from './types';
import {User} from '../../model/User';

export function requestUsers(): RequestUsers {
    return {type: REQUEST_USERS};
}

export function receiveUsers(users: User[]): ReceiveUsers {
    return {type: RECEIVE_USERS, users: users};
}

export function failedFetchingUsers(error: string): FailedFetchingUsers {
    return {type: FAILED_FETCHING_USERS, error};
}
