import {ThunkAction} from 'redux-thunk';
import {AppState} from '../reducers';
import {Action, Dispatch} from 'redux';
import {failedFetchingMiniQuizzes, receiveMiniQuizzes, requestMiniQuizzes} from './action';
import {get, LOAD_MINI_QUIZZES_BY_USER_URL, LOAD_MINI_QUIZZES_URL, post} from '../api';
import MiniQuiz from '../../model/MiniQuiz';

/** Fetches mini quizzes. */
export function fetchMiniQuizzes(): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch: Dispatch) => {
        dispatch(requestMiniQuizzes());
        try {
            const miniQuizzes = await get<Array<MiniQuiz>>(LOAD_MINI_QUIZZES_URL);
            dispatch(receiveMiniQuizzes(miniQuizzes));
        } catch (e) {
            dispatch(failedFetchingMiniQuizzes('Could not fetch mini quizzes'));
        }
    };
}

/** Fetches mini quizzes by userId. */
export function fetchMiniQuizzesByUser(userId: string): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch: Dispatch) => {
        dispatch(requestMiniQuizzes());
        try {
            const miniQuizzes = await post<Array<MiniQuiz>>(
                LOAD_MINI_QUIZZES_BY_USER_URL,
                userId);
            dispatch(receiveMiniQuizzes(miniQuizzes));
        } catch (e) {
            dispatch(failedFetchingMiniQuizzes('Could not fetch mini quizzes'));
        }
    };
}

