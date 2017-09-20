import React, {Component} from 'react';
import {connect} from 'react-redux';

import Logo from '../img/logo.svg'
import UsersGrid from "../UsersGrid";
import QuizPanel from "./QuizPanel";

class AdminPanel extends Component {

    showHead() {
        return (
            <div className="a-container">
                <div className="a-bar">
                    <img className="a-logo" src={Logo}/>
                    <div className="a-quiz-title">Quiz</div>
                    <div className="a-line">
                        <div className="a-author-text">by Grid Dynamics</div>
                    </div>
                    <h1 className="a-title">Admin Panel</h1>
                </div>
            </div>
        );
    }

    showUsers() {
        return <UsersGrid/>
    }

    showQuizPanel() {
        return <QuizPanel/>
    }

    render() {
        return (
            <div className="page">
                {this.showHead()}

                {this.showUsers()}

                {this.showQuizPanel()}
            </div>
        );
    }
}

export default connect(
    state => ({}),
    dispatch => ({})
)(AdminPanel);
