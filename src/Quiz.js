import React, {Component} from 'react';
import {connect} from 'react-redux';

import Logo from './img/logo.svg'
import UserAnswer from './models/UserAnswer';
import {Link} from 'react-router-dom';
import {sendForReview} from './actions/sendresults';

import {css} from 'aphrodite';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {xcode} from 'react-syntax-highlighter/dist/styles';

import StopWatch from './Stopwatch';
import Pattern from './img/background_pattern.svg';
import {startQuiz} from './actions/startquiz';


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
            <div className='quiz-header'>
                <img className='quiz-logo' src={Logo} alt='logo'/>
                <div className='quiz-title'>Quiz</div>
                <div className='quiz-author'>by Grid Dynamics</div>
            </div>
        );
    }

    showAnswers(answer) {
        let link = '/quiz/' + this.quiz.id + '/question/';
        let next = Number(this.props.match.params.qid) + 1;
        if (next <= this.length) {
            link += next;
        }
        else {
            return (
                <div className='quiz-content-answer' onClick={this.submit.bind(this, answer.id, true)} key={answer.id}>
                    {answer.text}
                </div>
            )
        }
        return (
            <Link to={link} className='quiz-content-answer' onClick={this.submit.bind(this, answer.id, false)}
                  key={answer.id}>
                {answer.text}
            </Link>
        )
    }

    showInputTextField(answer) {
        let link = '/quiz/' + this.quiz.id + '/question/';
        let next = Number(this.props.match.params.qid) + 1;
        let last = false;
        if (next <= this.length) {
            link += next;
            last = true;
        }
        return (
            <div className='answer-input-container'>
                <div className='input-container'>
                    <div className='input-text'>Type an answer</div>
                    <input className='answer-input' type='text' maxLength='40'
                           ref={(input) => this.inputAnswer = input}
                           placeholder={answer.text}/>
                    <div className='input-line-container'>
                        <hr className='input-line'/>
                    </div>
                </div>
                {this.showSubmitButton(last, link)}
            </div>
        )
    }

    showSubmitButton(lastQuestion, link) {
        if (lastQuestion) {
            return (
                <Link to={link} className='answer-button' onClick={this.submitInput.bind(this, false)}>
                    SUBMIT
                </Link>
            )
        }
        else {
            return (
                <div className='answer-button' onClick={this.submitInput.bind(this, true)}>
                    SUBMIT
                </div>
            )
        }
    }

    submitInput(sendResults) {
        let userAnswer = new UserAnswer(this.quiz.id, this.question.id, this.inputAnswer.value);
        this.inputAnswer.value = '';
        this.props.submit(userAnswer);
        this.useranswers.push(userAnswer);
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

        if (this.question.type === 'INPUT') {
            return this.showQuestionWitchInput(question, index, length);
        }
        else if (this.question.type === 'CODE') {
            return this.showQuestionWitchCode(question, index, length);
        }
        else {
            return this.showQuestionWitchText(question, index, length);
        }
    }

    showStopwatch() {
        return (
            <div className='value-container'>
                <div className='value'>
                    <StopWatch/>
                </div>
                <div className='value-text'>QUIZ TIMER</div>
            </div>
        )
    }

    showCounter(index, length) {
        return (
            <div className='value-container'>
                <div className='value'>{index + 1}/{length}</div>
                <div className='value-text'>QUESTIONS</div>
            </div>
        )
    }

    showQuestionWitchText(question, index, length) {
        return (
            <div>
                <div className='quiz-name'>{this.quiz.name}</div>
                <div className='question-title'>{question.title}</div>
                <div className='quiz-content-container'>
                    <div className='question-block'>
                        {this.showCounter(index, length)}
                        {this.showStopwatch()}
                    </div>
                    <div className='quiz-content-answer-container'>
                        {question.answers.map(i => this.showAnswers(i))}
                    </div>
                </div>
            </div>
        );
    }

    showQuestionWitchCode(question, index, length) {
        return (
            <div>
                <div className='quiz-content-container-code'>
                    <div className='quiz-name'>{this.quiz.name}</div>
                    <div className='question-title'>{question.title}</div>
                    <div className='question-block'>
                        {this.showCounter(index, length)}
                        {this.showStopwatch()}
                    </div>
                    <SyntaxHighlighter language='java' style={xcode} className='code-block'>
                        {question.text}
                    </SyntaxHighlighter>
                    <div className='quiz-content-answer-container'>
                        {question.answers.map(i => this.showAnswers(i))}
                    </div>
                </div>
            </div>
        );
    }

    showQuestionWitchInput(question, index, length) {
        return (
            <div>
                <div className='quiz-name'>{this.quiz.name}</div>
                <div className='question-title'>{question.title}</div>
                <div className='question-text'>{question.text}</div>
                <div className='quiz-content-container'>
                    <div className='question-block'>
                        {this.showCounter(index, length)}
                        {this.showStopwatch()}
                    </div>
                    <div className='quiz-content-answer-container'>
                        {this.showInputTextField(question.answers[0])}
                    </div>
                </div>
            </div>
        );
    }

    showResult() {
        this.props.stopWatch(Date.now());
        return (
            <div>
                <div className='backdrop'/>
                <div className='registration-modal'>
                    <div className='registration-modal-wrapper'>
                        <div className='registration-modal-header'>
                            <div className='registration-modal-title'>Well Done!</div>
                        </div>
                        <div className='result-content-container'>
                            <div className='result-container'>
                                <div className='result'>
                                    {this.res.points}/{this.quiz.questions.length}
                                </div>
                                <div className='result-text'>QUESTIONS</div>
                            </div>
                        </div>
                        <div className='result-comment'>
                            {this.res.comment.message}
                        </div>

                        <div className='result-modal-footer'>
                            <Link to='/dashboard' className='result-button'>SEE RESULTS</Link>
                        </div>
                    </div>
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
            quizColor = `url(${Pattern})` + ', linear-gradient(180deg, ' + this.quiz.colors[0].code + ' 0%, ' + this.quiz.colors[1].code + ' 100%)';

            return (
                <div className='page'>
                    <div className='quiz-container' style={{background: quizColor}}>
                        {this.res && this.res.length !== 0 && this.showResult()}
                        {this.quiz && this.quiz.length !== 0 && this.showHead()}
                        {this.quiz && this.quiz.length !== 0 && this.showQuestions()}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className='page'>
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