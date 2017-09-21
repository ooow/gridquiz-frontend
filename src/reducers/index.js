import {combineReducers} from 'redux';

import quizzes from './quizzes';
import useranswers from './useranswers';
import result from "./result";
import stopwatch from "./stopwatch";
import users from "./admin/users";
import quiz from "./quiz";
import user from "./user";

export default combineReducers({
    quizzes,
    useranswers,
    result,
    stopwatch,
    users,
    quiz,
    user
})