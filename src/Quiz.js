import React, {Component} from 'react';
import {connect} from 'react-redux';

import Logo from './img/logo.svg'
import UserAnswer from "./models/UserAnswer";
import {Link} from "react-router-dom";
import {sendForReview} from "./actions/sendresults";

import {css} from 'aphrodite';
import styles from './styles/QuizStyles';

import StopWatch from "./Stopwatch";
import {startQuiz} from "./actions/startquiz";
import Back from './img/back.svg';


class Quiz extends Component {

    constructor(props) {
        super(props);
        this.quiz = this.props.quizzes.find(i => i.id === Number(this.props.match.params.id));
    }

    showHead() {
        let quizColor = `url(${Back})` + ", linear-gradient(180deg, " + this.quiz.colors[0].code + " 0%, " + this.quiz.colors[1].code + " 100%)";
        return (
            <div className={css(styles.head)} style={{background: quizColor}}>
                <div className={css(styles.logoContainer)}>
                    <img className={css(styles.logo)} src={Logo}/>
                </div>
                <div className={css(styles.quizTitle)}>Quiz</div>
                <div className={css(styles.lineContainer)}>
                    <div className={css(styles.line)}>by</div>
                    <div className={css(styles.quizAuthor)}>Grid Dynamics</div>
                </div>
                <h1 className={css(styles.quizName)}>{this.quiz.name}</h1>
                <div className={css(styles.stopwatchContainer)}>
                    <div className={css(styles.stopwatch)}>
                        <StopWatch/>
                    </div>
                    <div className={css(styles.stopwatchText)}>QUIZ TIMER</div>
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
                <div className={css(styles.answer)} onClick={this.submit.bind(this, answer.id, true)} key={answer.id}>
                    {answer.text}
                </div>
            )
        }
        return (
            <div className={css(styles.answer)} onClick={this.submit.bind(this, answer.id, false)} key={answer.id}>
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

        let quizColor = `url(${Back})`;

        return (
            <div className={css(styles.bodyContainer)} style={{background: quizColor}}>
                <div className={css(styles.question)}>
                    <div className={css(styles.counter)}>{index + 1}/{length}</div>
                    <div className={css(styles.counterText)}>QUESTIONS</div>
                    <div className={css(styles.questionText)}>{question.title}</div>
                </div>
                <div className={css(styles.answersContainer)}>
                    {question.answers.map(i => this.showAnswers(i))}
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
                <div className={css(styles.container)}>
                    {this.res && this.res.length !== 0 && this.showResult()}
                    {this.quiz && this.showHead()}
                    {this.quiz && this.showQuestions()}
                </div>
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