import {ThunkAction} from 'redux-thunk';
import {AppState} from '../reducers';
import {Action, Dispatch} from 'redux';
import {failedSubmittingAnswers, receiveResult, submitAnswers} from './action';
import {post, SUBMIT_ANSWERS_URL} from '../api';
import Result from '../../model/Result';
import {Answers} from '../../model/Answers';

/** Submits user answers. */
export function submit(userId: string, answers: Answers): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch: Dispatch) => {
        dispatch(submitAnswers());
        try {
            const result: Result = await post<Result>(SUBMIT_ANSWERS_URL,
                {userId, message: answers});
            dispatch(receiveResult(result));
        } catch (e) {
            dispatch(failedSubmittingAnswers('Could not submit answers'));
        }
    };
}
