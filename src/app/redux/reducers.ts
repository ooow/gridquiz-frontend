import {combineReducers} from 'redux';
import {quizReducer} from './quiz/reducer';
import {userReducer} from './user/reducer';

export const rootReducer = combineReducers({
    quizState: quizReducer,
    // @ts-ignore
    userState: userReducer,
});

export type AppState = ReturnType<typeof rootReducer>
