import {ThunkAction} from 'redux-thunk';
import {AppState} from '../reducers';
import {Action, Dispatch} from 'redux';
import {ADMIN_USERS_URL, get} from '../api';
import {User} from '../../model/User';
import {failedFetchingUsers, receiveUsers, requestUsers} from './action';

/** Fetches all users. */
export function getUsers(): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch: Dispatch) => {
        dispatch(requestUsers());
        try {
            const users: User[] = await get<User[]>(ADMIN_USERS_URL);
            dispatch(receiveUsers(users));
        } catch (e) {
            dispatch(failedFetchingUsers('Could not fetch users'));
        }
    };
}
