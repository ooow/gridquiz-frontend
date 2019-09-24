import {User} from '../../model/User';

export const FAILED_FETCHING_USER = 'FAILED_FETCHING_USER';
export const LOGOUT = 'LOGOUT';
export const RECEIVE_USER = 'RECEIVE_USER';
export const REQUEST_USER = 'REQUEST_USER';
export const TOGGLE_LOGIN_DIALOG = 'TOGGLE_LOGIN_DIALOG';

export interface UserState {
    isFetching: boolean,
    showAuthDialog: boolean,
    user?: User,
    error?: string,
}

export type UserActionTypes = FailedFetchingUser
    | ReceiveUser | RequestUser | Logout | ToggleAuthDialog;

export interface RequestUser {
    type: typeof REQUEST_USER;
}

export interface ReceiveUser {
    type: typeof RECEIVE_USER;
    user: User;
}

export interface FailedFetchingUser {
    type: typeof FAILED_FETCHING_USER;
    error: string;
}

export interface Logout {
    type: typeof LOGOUT;
}

export interface ToggleAuthDialog {
    type: typeof TOGGLE_LOGIN_DIALOG;
}

