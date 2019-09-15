import fetch from 'cross-fetch';
import {ThunkAction} from 'redux-thunk';
import {AppState} from '../reducers';
import {Action, Dispatch} from 'redux';
import {failedFetchingUser, receiveUser, requestUser} from './action';
import {LOAD_USER_URL} from '../api';
import {User} from '../../model/User';

//TODO: Temp.
/** Fetches quiz by id. */
export function getUser(): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch: Dispatch) => {
        dispatch(requestUser());
        try {
            const resp: Response = await fetch(LOAD_USER_URL);
            const user: User = await resp.json();
            dispatch(receiveUser(user));
        } catch (e) {
            dispatch(failedFetchingUser('Could not fetch user'));
        }
    };
}
