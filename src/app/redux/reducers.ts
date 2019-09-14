import {combineReducers} from 'redux';
import {quizReducer} from './quiz/reducer';

export const rootReducer = combineReducers({
    quizState: quizReducer,
});

export type AppState = ReturnType<typeof rootReducer>
