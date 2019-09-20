import {ThunkAction} from 'redux-thunk';
import {AppState} from '../reducers';
import {Action, Dispatch} from 'redux';
import {failedFetchingMiniQuizzes, failedFetchingProgress, receiveMiniQuizzes, receiveProgress, requestMiniQuizzes, startProgress} from './action';
import {get, LOAD_MINI_QUIZZES_BY_USER_URL, LOAD_MINI_QUIZZES_URL, LOAD_PROGRESS_URL, post} from '../api';
import MiniQuiz from '../../model/MiniQuiz';
import {User} from '../../model/User';
import Progress from '../../model/Progress';

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

/** Fetches quiz progress by user and quiz id. */
export function getProgress(user: User, quizId: string): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch: Dispatch) => {
        dispatch(startProgress());
        try {
            const progress: Progress = await post<Progress>(LOAD_PROGRESS_URL, {
                user: user,
                message: quizId,
            });
            dispatch(receiveProgress(progress));
        } catch (e) {
            dispatch(failedFetchingProgress('Could not fetch mini quizzes'));
        }
    };
}
