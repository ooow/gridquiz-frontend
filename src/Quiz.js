import React, {Component} from 'react';
import {connect} from 'react-redux';

import Logo from './img/logo.svg'
import UserAnswer from "./models/UserAnswer";
import {Link} from "react-router-dom";
import {sendForReview} from "./actions/sendresults";

import {css} from 'aphrodite';
import styles from './styles/QuizStyles';

import StopWatch from "./Stopwatch";
import Back from './img/back.svg';
import {startQuiz} from "./actions/startquiz";


class Quiz extends Component {

    constructor(props) {
        super(props);
        this.quiz = this.props.quiz;

        this.state = {
            user: JSON.parse(localStorage.getItem('user'))
        };

        this.props.startQuiz(Number(this.props.match.params.id), this.state.user.token);
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

    showResult() {
        this.props.stopWatch(Date.now());
        return (
            <div className={css(styles.resultForm)}>
                <div className={css(styles.backdrop)}/>
                <div className={css(styles.modalPlace)}>
                    <div className={css(styles.modalPlaceTitle)}>Well Done!</div>
                    <div className={css(styles.resultContainer)}>
                        <div className={css(styles.result)}>
                            {this.res.points}/{this.quiz.questions.length}
                        </div>
                        <div className={css(styles.resultText)}>QUESTIONS</div>
                    </div>
                    <div className={css(styles.modalPlaceComment)}>{this.res.comment.message}</div>
                    <Link to="/" className={css(styles.resultButton)}>SEE RESULTS</Link>
                </div>
            </div>
        );
    }

    submit(answerId, sendResults) {
        let userAnswer = new UserAnswer(this.quiz.id, this.question.id, answerId);
        this.props.submit(userAnswer);
        this.useranswers.push(userAnswer);

        if (sendResults) {
            this.props.sendForReview(this.useranswers, this.state.user.token);
        }
    }

    componentWillMount() {
        this.quiz = this.props.quiz;
    }

    render() {
        this.useranswers = this.props.useranswers;
        this.res = this.props.result;
        this.quiz = this.props.quiz;

        return (
            <div className="page">
                <div className={css(styles.container)}>
                    {this.res && this.res.length !== 0 && this.showResult()}
                    {this.quiz && this.quiz.length !== 0 && this.showHead()}
                    {this.quiz && this.quiz.length !== 0 && this.showQuestions()}
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        quiz: state.quiz,
        useranswers: state.useranswers,
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
        sendForReview: (results, userToken) => {
            dispatch(sendForReview(results, userToken));
        },
        startQuiz: (quizId, userToken) => {
            dispatch(startQuiz(quizId, userToken));
        }
    }))(Quiz);