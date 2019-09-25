import {combineReducers} from 'redux';
import {miniQuizReducer} from './miniquiz/reducer';
import {userReducer} from './user/reducer';
import {resultReducer} from './result/reducer';
import {dashboardReducer} from './dashboards/reducer';
import {progressReducer} from './progress/reducer';

export const rootReducer = combineReducers({
    miniQuizState: miniQuizReducer,
    userState: userReducer,
    resultState: resultReducer,
    dashboardState: dashboardReducer,
    progressState: progressReducer,
});

export type AppState = ReturnType<typeof rootReducer>
