import {combineReducers} from 'redux';

import quizzes from './quizzes';
import questions from './questions';
import result from "./result";
import stopwatch from "./stopwatch";
import users from "./users";
import user from "./user";
import quiz from "./quiz";

export default combineReducers({
    quizzes,
    questions,
    result,
    stopwatch,
    users,
    user,
    quiz
})