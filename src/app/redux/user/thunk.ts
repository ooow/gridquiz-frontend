import {ThunkAction} from 'redux-thunk';
import {AppState} from '../reducers';
import {Action, Dispatch} from 'redux';
import {failedFetchingUser, receiveUser, requestUser} from './action';
import {AUTH_URL, post} from '../api';
import {User} from '../../model/User';

/** Authorizes the user. */
export function login(user: User): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch: Dispatch) => {
        dispatch(requestUser());
        try {
            const authUser: User = await post<User>(AUTH_URL, user);
            dispatch(receiveUser(authUser));
        } catch (e) {
            dispatch(failedFetchingUser('Could not fetch user'));
        }
    };
}
