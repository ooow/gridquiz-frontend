import React, {Component} from 'react';
import {connect} from 'react-redux';

import Logo from './img/logo.svg'
import UserAnswer from "./models/UserAnswer";
import {Link} from "react-router-dom";
import {sendForReview} from "./actions/sendresults";

import StopWatch from "./Stopwatch";
import {startQuiz} from "./actions/startquiz";


class Quiz extends Component {

    constructor(props) {
        super(props);
        this.quiz = this.props.quizzes.find(i => i.id === Number(this.props.match.params.id));
    }

    showHead() {
        return (
            <div className="q-container">
                <div className="q-bar">
                    <img className="q-logo" src={Logo}/>
                    <div className="q-quiz-title">Quiz</div>
                    <div className="q-line">
                        <div className="q-author-text">by Grid Dynamics</div>
                    </div>
                    <h1 className="q-quiz-name">Dev Ops Tech</h1>
                    <div className="timer">
                        <StopWatch/>
                    </div>
                </div>
            </div>
        );
    }

    showAnswers(answer) {
        let link = "/quiz/" + this.quiz.id + "/question/";
        let next = Number(this.props.match.params.qid) + 1;
        if (next <= this.length) {
            link += next;
        }
        else {
            return (
                <div onClick={this.submit.bind(this, answer.id, true)} key={answer.id} className="answer">
                    {answer.text}
                </div>
            )
        }
        return (
            <div className="answer" onClick={this.submit.bind(this, answer.id, false)} key={answer.id}>
                <Link to={link}>
                    {answer.text}
                </Link>
            </div>
        )

    }

    showQuestions() {
        let index = Number(this.props.match.params.qid) - 1;
        let length = this.quiz.questions.length;
        let question = this.quiz.questions[index];

        this.question = question;
        this.length = length;

        return (
            <div className="q-container-2">
                <div className="question">
                    <div className="counter">{index + 1}/{length}</div>
                    <h1 className="question-text">{question.title}</h1>
                    <div className="answers">
                        {question.answers.map(i => this.showAnswers(i))}
                    </div>
                </div>
            </div>
        );
    }

    formatTime(timerResult) {
        return Math.floor(timerResult / 60000) + ':' + ('0' + Math.floor(timerResult / 1000) % 60).slice(-2);
    }

    showResult() {
        this.props.stopWatch(Date.now());
        let timerResult = this.formatTime(this.props.stopwatch.end - this.props.stopwatch.start);

        return (
            <div className="result">
                <div className="modal-backdrop">
                </div>
                <div className="modal-window">
                    <h1 className="modal-title">Well Done!</h1>
                    <div className="result-window">
                        <div className="result-window-total">
                            {this.res.points}/{this.quiz.questions.length}
                        </div>
                        <div className="result-window-text">QUESTIONS</div>
                    </div>
                    <div className="result-time">
                        <h1>{timerResult}</h1>
                    </div>
                    <div className="modal-comment">{this.res.comment.message}</div>
                    <Link to="/" className="result-link">See result</Link>
                </div>
            </div>
        );
    }

    submit(answerId, sendResults) {
        let userAnswer = new UserAnswer(this.quiz.id, this.question.id, answerId);
        this.props.submit(userAnswer);
        this.questions.push(userAnswer);

        if (sendResults) {
            this.props.sendForReview(this.questions);
        }
    }

    render() {
        this.quiz = this.props.quizzes.find(i => i.id === Number(this.props.match.params.id));
        this.questions = this.props.questions;
        this.res = this.props.result;

        return (
            <div className="page">
                {this.res && this.res.length !== 0 && this.showResult()}

                {this.showHead()}

                {this.quiz && this.showQuestions()}
            </div>
        );
    }
}

export default connect(
    state => ({
        quizzes: state.quizzes,
        questions: state.questions,
        result: state.result,
        stopwatch: state.stopwatch
    }),
    dispatch => ({
        submit: (answerId) => {
            dispatch({type: 'SUBMIT_ANSWER', payload: answerId});
        },
        stopWatch: (date) => {
            dispatch({type: 'STOP_WATCH', payload: date});
        },
        sendForReview: (results) => {
            dispatch(sendForReview(results));
        },
        startQuiz(timestamp) {
            dispatch(startQuiz(timestamp));
        }
    }))(Quiz);