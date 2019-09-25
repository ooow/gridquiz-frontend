import {ThunkAction} from 'redux-thunk';
import {AppState} from '../reducers';
import {Action, Dispatch} from 'redux';
import Quiz, {NewQuiz} from '../../model/Quiz';
import {post, SAVE_QUIZ_URL} from '../api';
import {failedSavingQuiz, receiveQuiz, saveQuiz} from './action';

/** Saves new quiz. */
export function save(newQuiz: NewQuiz): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch: Dispatch) => {
        dispatch(saveQuiz());
        try {
            const quiz = await post<Quiz>(SAVE_QUIZ_URL, newQuiz);
            dispatch(receiveQuiz(quiz));
        } catch (e) {
            dispatch(failedSavingQuiz('Could not save the quiz'));
        }
    };
}
