import {combineReducers} from 'redux';
import {quizReducer} from './quiz/reducer';
import {userReducer} from './user/reducer';
import {resultReducer} from './result/reducer';

export const rootReducer = combineReducers({
    quizState: quizReducer,
    // @ts-ignore
    userState: userReducer,
    resultState: resultReducer,
});

export type AppState = ReturnType<typeof rootReducer>
