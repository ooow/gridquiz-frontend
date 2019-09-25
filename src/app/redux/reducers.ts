import {combineReducers} from 'redux';
import {miniQuizReducer} from './miniquiz/reducer';
import {userReducer} from './user/reducer';
import {resultReducer} from './result/reducer';
import {dashboardReducer} from './dashboards/reducer';
import {progressReducer} from './progress/reducer';
import {quizReducer} from './quiz/reducer';
import {adminReducer} from './admin/reducer';

export const rootReducer = combineReducers({
    adminState: adminReducer,
    dashboardState: dashboardReducer,
    miniQuizState: miniQuizReducer,
    progressState: progressReducer,
    quizState: quizReducer,
    resultState: resultReducer,
    userState: userReducer,
});

export type AppState = ReturnType<typeof rootReducer>
