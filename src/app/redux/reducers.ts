import {combineReducers} from 'redux';
import {quizReducer} from './quiz/reducer';
import {userReducer} from './user/reducer';
import {resultReducer} from './result/reducer';
import {dashboardReducer} from './dashboards/reducer';
import {progressReducer} from './progress/reducer';

export const rootReducer = combineReducers({
    quizState: quizReducer,
    // @ts-ignore
    userState: userReducer,
    resultState: resultReducer,
    dashboardState: dashboardReducer,
    progressState: progressReducer,
});

export type AppState = ReturnType<typeof rootReducer>
