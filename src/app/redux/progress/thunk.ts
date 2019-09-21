import {ThunkAction} from 'redux-thunk';
import {AppState} from '../reducers';
import {Action, Dispatch} from 'redux';
import {failedFetchingProgress, receiveProgress, startProgress} from './action';
import {LOAD_PROGRESS_URL, post} from '../api';
import Progress from '../../model/Progress';

/** Starts quiz progress for the user by quiz id. */
export function getProgress(userId: string, quizId: string): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch: Dispatch) => {
        dispatch(startProgress());
        try {
            const progress: Progress = await post<Progress>(LOAD_PROGRESS_URL, {
                userId,
                message: quizId,
            });
            dispatch(receiveProgress(progress));
        } catch (e) {
            dispatch(failedFetchingProgress('Could not start progress'));
        }
    };
}
