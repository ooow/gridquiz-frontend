import React, {Component} from 'react';
import {connect} from 'react-redux';

import Logo from './img/logo.svg'
import UserAnswer from "./models/UserAnswer";
import {Link} from "react-router-dom";

class Result extends Component {

    render() {
        return (
            <div className="page">
                Result
            </div>
        );
    }
}

export default connect(
    state => ({
        quizzes: state.quizzes
    }),
    dispatch => ({
        submit: (answerId) => {
            dispatch({type: 'SUBMIT_ANSWER', payload: answerId});
        }
    })
)(Result);
