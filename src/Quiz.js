import React, {Component} from 'react';
import {connect} from 'react-redux';

import Logo from './img/logo.svg'
import UserAnswer from "./UserAnswer";
import {Link} from "react-router-dom";
import {sendForReview} from "./actions/sendresults";

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
                    <div className="timer">4:59</div>
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

            /// todo FIXMEEEEEE
            this.result = this.props.result;
            {
                this.result && alert(this.result.comment)
            }
        }
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
                        {question.answers.map(i =>
                            this.showAnswers(i)
                        )}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        this.quiz = this.props.quizzes.find(i => i.id === Number(this.props.match.params.id));
        this.questions = this.props.questions;

        return (
            <div className="page">
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
        result: state.result
    }),
    dispatch => ({
        submit: (answerId) => {
            dispatch({type: 'SUBMIT_ANSWER', payload: answerId});
        }
        ,
        sendForReview: (results) => {
            dispatch(sendForReview(results));
        }
    })
)(Quiz);
