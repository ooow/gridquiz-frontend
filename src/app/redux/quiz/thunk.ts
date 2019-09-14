import fetch from 'cross-fetch';
import {ThunkAction} from 'redux-thunk';
import {AppState} from '../reducers';
import {Action, Dispatch} from 'redux';
import {failedFetchingMiniQuizzes, receiveMiniQuizzes, requestMiniQuizzes} from './action';
import {LOAD_MINI_QUIZZES_URL} from '../api';

/** Fetches mini quizzes. */
export default function fetchMiniQuizzes(): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch: Dispatch) => {
        dispatch(requestMiniQuizzes());
        try {
            const resp: Response = await fetch(LOAD_MINI_QUIZZES_URL);
            const miniQuizzes = await resp.json();
            dispatch(receiveMiniQuizzes(miniQuizzes));
        } catch (e) {
            dispatch(failedFetchingMiniQuizzes(e as Error));
        }
    };
}
