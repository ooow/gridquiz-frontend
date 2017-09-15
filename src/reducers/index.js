import {combineReducers} from 'redux';

import quizzes from './quizzes';
import questions from './questions';
import result from "./result";

export default combineReducers({
    quizzes,
    questions,
    result
})