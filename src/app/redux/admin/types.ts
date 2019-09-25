import {User} from '../../model/User';

export const REQUEST_USERS = 'REQUEST_ALL_USERS';
export const RECEIVE_USERS = 'RECEIVE_ALL_USERS';
export const FAILED_FETCHING_USERS = 'FAILED_FETCHING_USERS';

export interface AdminState {
    isFetching: boolean,
    users?: User[],
    error?: string,
}

export type AdminActionTypes = FailedFetchingUsers | ReceiveUsers
    | RequestUsers;

export interface RequestUsers {
    type: typeof REQUEST_USERS;
}

export interface ReceiveUsers {
    type: typeof RECEIVE_USERS;
    users: User[];
}

export interface FailedFetchingUsers {
    type: typeof FAILED_FETCHING_USERS;
    error: string;
}
