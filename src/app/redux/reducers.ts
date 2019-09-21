import {combineReducers} from 'redux';
import {quizReducer} from './quiz/reducer';
import {userReducer} from './user/reducer';
import {resultReducer} from './result/reducer';
import {dashboardReducer} from './dashboards/reducer';

export const rootReducer = combineReducers({
    quizState: quizReducer,
    // @ts-ignore
    userState: userReducer,
    resultState: resultReducer,
    dashboardState: dashboardReducer,
});

export type AppState = ReturnType<typeof rootReducer>
