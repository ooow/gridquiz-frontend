import fetch from 'cross-fetch';
import {ThunkAction} from 'redux-thunk';
import {AppState} from '../reducers';
import {Action, Dispatch} from 'redux';
import {failedFetchingMiniQuizzes, failedFetchingQuiz, receiveMiniQuizzes, receiveQuiz, requestMiniQuizzes, requestQuiz} from './action';
import {LOAD_MINI_QUIZZES_URL, LOAD_QUIZ_URL} from '../api';
import MiniQuiz from '../../model/MiniQuiz';
import Quiz from '../../model/Quiz';
import {User} from '../../model/User';

/** Fetches mini quizzes. */
export function fetchMiniQuizzes(): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch: Dispatch) => {
        dispatch(requestMiniQuizzes());
        try {
            const resp: Response = await fetch(LOAD_MINI_QUIZZES_URL);
            const miniQuizzes: Array<MiniQuiz> = await resp.json();
            dispatch(receiveMiniQuizzes(miniQuizzes));
        } catch (e) {
            dispatch(failedFetchingMiniQuizzes('Could not fetch mini quizzes'));
        }
    };
}

/** Fetches quiz by id. */
export function getQuiz(user: User, quizId: string): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch: Dispatch) => {
        dispatch(requestQuiz());
        try {
            const resp: Response = await fetch(LOAD_QUIZ_URL,
                {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user: user,
                        message: quizId,
                    }),
                });
            const quiz: Quiz = await resp.json();
            dispatch(receiveQuiz(quiz));
        } catch (e) {
            dispatch(failedFetchingQuiz('Could not fetch mini quizzes'));
        }
    };
}
