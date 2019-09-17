import {ThunkAction} from 'redux-thunk';
import {AppState} from '../reducers';
import {Action, Dispatch} from 'redux';
import {failedFetchingAttempt, failedFetchingMiniQuizzes, receiveAttempt, receiveMiniQuizzes, requestAttempt, requestMiniQuizzes} from './action';
import {get, LOAD_ATTEMPT_URL, LOAD_MINI_QUIZZES_BY_USER_URL, LOAD_MINI_QUIZZES_URL, post} from '../api';
import MiniQuiz from '../../model/MiniQuiz';
import {User} from '../../model/User';
import Attempt from '../../model/Attempt';

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

/** Fetches quiz by id. */
export function getAttempt(user: User, quizId: string): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch: Dispatch) => {
        dispatch(requestAttempt());
        try {
            const attempt: Attempt = await post<Attempt>(LOAD_ATTEMPT_URL, {
                user: user,
                message: quizId,
            });
            dispatch(receiveAttempt(attempt));
        } catch (e) {
            dispatch(failedFetchingAttempt('Could not fetch mini quizzes'));
        }
    };
}
