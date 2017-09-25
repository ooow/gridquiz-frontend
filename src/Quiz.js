import React, {Component} from 'react';
import {connect} from 'react-redux';

import Logo from './img/logo.svg'
import UserAnswer from "./models/UserAnswer";
import {Link} from "react-router-dom";
import {sendForReview} from "./actions/sendresults";

import {css} from 'aphrodite';
import styles from './styles/QuizStyles';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {idea} from 'react-syntax-highlighter/dist/styles';

import StopWatch from "./Stopwatch";
import Pattern from './img/background_pattern.svg';
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
        return (
            <div className={css(styles.head)}>
                <div className={css(styles.logoContainer)}>
                    <img className={css(styles.logo)} src={Logo} alt="logo"/>
                </div>
                <div className={css(styles.quizTitleContainer)}>
                    <div className={css(styles.quizTitle)}>Quiz</div>
                </div>
                <div className={css(styles.quizName)}>{this.quiz.name}</div>
                <div className={css(styles.space)}/>
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
            <Link to={link} className={css(styles.answer)} onClick={this.submit.bind(this, answer.id, false)}
                  key={answer.id}>
                {answer.text}
            </Link>
        )
    }

    showInputTextField(answer) {
        let link = "/quiz/" + this.quiz.id + "/question/";
        let next = Number(this.props.match.params.qid) + 1;
        if (next <= this.length) {
            link += next;
        }
        else {
            return (
                <div className={css(styles.answerInputContainer)}>
                    <div className={css(styles.inputContainer)}>
                        <div className={css(styles.inputText)}>Type an answer</div>
                        <input className={css(styles.answerInput)} type="text" maxLength="30"
                               ref={(input) => this.inputAnswer = input}
                               placeholder={answer.text}
                        />
                        <div className={css(styles.inputLineContainer)}>
                            <hr className={css(styles.inputLine)}/>
                        </div>
                    </div>
                    <div className={css(styles.answerButton)} onClick={this.submitInput.bind(this, true)}>
                        SUBMIT
                    </div>
                </div>
            )
        }
        return (
            <div className={css(styles.answerInputContainer)}>
                <div className={css(styles.inputContainer)}>
                    <div className={css(styles.inputText)}>Type an answer</div>
                    <input className={css(styles.answerInput)} type="text" maxLength="30"
                           ref={(input) => this.inputAnswer = input}
                           placeholder={answer.text}
                    />
                    <div className={css(styles.inputLineContainer)}>
                        <hr className={css(styles.inputLine)}/>
                    </div>
                </div>
                <Link to={link} className={css(styles.answerButton)} onClick={this.submitInput.bind(this, false)}>
                    SUBMIT
                </Link>
            </div>
        )
    }

    submitInput(sendResults) {
        let userAnswer = new UserAnswer(this.quiz.id, this.question.id, this.inputAnswer.value);
        this.inputAnswer.value = "";
        this.props.submit(userAnswer);
        this.useranswers.push(userAnswer);
        console.log(userAnswer);
        if (sendResults) {
            this.props.sendForReview(this.useranswers, this.state.user.token);
        }
    }

    submit(answerId, sendResults) {
        let userAnswer = new UserAnswer(this.quiz.id, this.question.id, answerId);
        this.props.submit(userAnswer);
        this.useranswers.push(userAnswer);

        if (sendResults) {
            this.props.sendForReview(this.useranswers, this.state.user.token);
        }
    }

    showQuestions() {
        let index = Number(this.props.match.params.qid) - 1;
        let length = this.quiz.questions.length;
        let question = this.quiz.questions[index];

        this.question = question;
        this.length = length;


        if (this.question.type === "INPUT") {
            return this.showQuestionWitchInput(question, index, length);
        }
        else if (this.question.type === "CODE") {
            return this.showQuestionWitchCode(question, index, length);
        }
        else {
            return this.showQuestionWitchText(question, index, length);
        }
    }

    showStopwatch() {
        return (
            <div className={css(styles.valueContainer)}>
                <div className={css(styles.value)}>
                    <StopWatch/>
                </div>
                <div className={css(styles.valueText)}>QUIZ TIMER</div>
            </div>
        )
    }

    showCounter(index, length) {
        return (
            <div className={css(styles.valueContainer)}>
                <div className={css(styles.value)}>{index + 1}/{length}</div>
                <div className={css(styles.valueText)}>QUESTIONS</div>
            </div>
        )
    }

    showQuestionWitchText(question, index, length) {
        return (
            <div className={css(styles.bodyContainer)}>
                <div className={css(styles.questionContainer)}>
                    {this.showCounter(index, length)}
                    <div className={css(styles.questionTitle)}>{question.title}</div>
                    {this.showStopwatch()}
                </div>
                <div className={css(styles.answersContainer)}>
                    {question.answers.map(i => this.showAnswers(i))}
                </div>
            </div>
        );
    }

    showQuestionWitchCode(question, index, length) {
        return (
            <div className={css(styles.bodyContainer)}>
                <div className={css(styles.codeContainer)}>
                    <div className={css(styles.questionContainerCode)}>
                        {this.showCounter(index, length)}
                        <div className={css(styles.codeQuestionTitle)}>{question.title}</div>
                        {this.showStopwatch()}
                    </div>
                    <SyntaxHighlighter language='java' style={idea} className={css(styles.codeQuestionText)}>
                        {question.text}
                    </SyntaxHighlighter>
                </div>
                <div className={css(styles.answersContainer)}>
                    {question.answers.map(i => this.showAnswers(i))}
                </div>
            </div>
        );
    }

    showQuestionWitchInput(question, index, length) {
        return (
            <div className={css(styles.bodyContainer)}>
                <div className={css(styles.questionContainer)}>
                    {this.showCounter(index, length)}
                    <div className={css(styles.questionInputContainer)}>
                        <div className={css(styles.questionInputTitle)}>{question.title}</div>
                        <div className={css(styles.questionInputText)}>{question.text}</div>
                    </div>
                    {this.showStopwatch()}
                </div>
                <div className={css(styles.answersContainer)}>
                    {this.showInputTextField(question.answers[0])}
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
                    <Link to="/dashboard" className={css(styles.resultButton)}>SEE RESULTS</Link>
                </div>
            </div>
        );
    }

    componentWillMount() {
        this.quiz = this.props.quiz;
    }

    render() {
        this.useranswers = this.props.useranswers;
        this.res = this.props.result;
        this.quiz = this.props.quiz;

        let quizColor;
        if (this.quiz.length !== 0 && this.quiz !== 'Quiz already complete.') {
            quizColor = `url(${Pattern})` + ", linear-gradient(180deg, " + this.quiz.colors[0].code + " 0%, " + this.quiz.colors[1].code + " 100%)";

            return (
                <div className="page">
                    <div className={css(styles.quizContainer)} style={{background: quizColor}}>
                        {this.res && this.res.length !== 0 && this.showResult()}
                        {this.quiz && this.quiz.length !== 0 && this.showHead()}
                        {this.quiz && this.quiz.length !== 0 && this.showQuestions()}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="page">
                    {this.quiz}
                </div>
            );
        }
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