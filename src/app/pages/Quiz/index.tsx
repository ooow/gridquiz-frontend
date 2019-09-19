import React, {Component, CSSProperties} from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../redux/reducers';
import {UserToken} from '../../model/User';
import {getAttempt} from '../../redux/quiz/thunk';
import {submit} from '../../redux/result/thunk';
import {Answer, Answers} from '../../model/Answers';
import {Link} from 'react-router-dom';
import Attempt from '../../model/Attempt';
import Navbar from '../../components/Navbar';
import Question from '../../model/Question';
import Result from '../../model/Result';
import Stopwatch from '../../components/Navbar/Stopwatch';
import {defaultColor} from '../../components/Miniquiz';
import './style.scss';

interface QuizProps {
    attempt?: Attempt;
    userToken?: UserToken;
    result?: Result;
    match: any;
    getAttempt: any;
    submit: any;
}

interface QuizState {
    currentQuestionIndex: number;
    finished: boolean;
}

class QuizView extends Component<QuizProps, QuizState> {
    constructor(props: QuizProps) {
        super(props);

        this.state = {currentQuestionIndex: 0, finished: false};
    }

    answers: Answer[] = [];

    componentDidMount() {
        const {userToken, match} = this.props;
        this.props.getAttempt(userToken!.user, match.params.id);
    }

    nextQuestion(answer: string, questionId: string) {
        const {quiz} = this.props.attempt!;

        this.storeAnswer(answer, questionId);

        if (this.state.currentQuestionIndex < quiz.questions.length - 1) {
            this.setState((prevState: QuizState) =>
                ({currentQuestionIndex: prevState.currentQuestionIndex + 1}));
        } else {
            this.setState({finished: true});
            this.sendAnswers();
        }
    }

    storeAnswer(answer: string, questionId: string) {
        this.answers.push({questionId, answer}); // Push answer to the question.
    }

    sendAnswers() {
        const {userToken, attempt} = this.props;
        const userAnswers: Answers = {
            quizId: attempt!.quiz.id,
            answers: this.answers,
        };

        this.props.submit(userToken!.user, userAnswers);
    }

    renderAnswer(answerBody: string, answerIndex: number, questionId: string) {
        return (
            <div
                className='d-flex m-5 p-3 cursor-pointer border border-info'
                onClick={this.nextQuestion.bind(this, answerBody, questionId)}
                key={answerIndex}
            >
                <div>{answerIndex + 1}</div>
                |
                <div>{answerBody}</div>
            </div>
        );
    }

    renderQuizBody() {
        const {quiz} = this.props.attempt!;
        const {currentQuestionIndex} = this.state;
        const question: Question = quiz.questions[currentQuestionIndex];

        return (
            <div className='container text-white'>
                <div className='row justify-content-center'>
                    {quiz.name}
                </div>
                <div className='row justify-content-center mt-5'>
                    {question.title}
                </div>
                <div className='row justify-content-center mt-5'>
                    {
                        question.answers.map((a, i) =>
                            this.renderAnswer(a, i, question.id))
                    }
                </div>
            </div>
        );
    }

    renderNavbar(startTime: Date) {
        return (
            <Navbar>
                <Stopwatch start={startTime} className='stopwatch' />
            </Navbar>
        );
    }

    render() {
        const {attempt, result} = this.props;
        const {finished} = this.state;
        let style: CSSProperties = {background: defaultColor};

        if (attempt) {
            style = {background: attempt.quiz.color};
        }

        return (
            <div className='h-100vh' style={style}>
                {!finished && attempt &&
                <div>
                    {this.renderNavbar(new Date(attempt.result.startTime))}
                    {this.renderQuizBody()}
                </div>
                }
                {
                    finished && result &&
                    <div className='row justify-content-center mt-5 pt-5 text-center'>
                        Quiz is Finished!
                        {result.points}/{result.outOf}
                        <Link to="/" className='p-4 bg-info'>
                            Go home
                        </Link>
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        attempt: state.quizState.attempt,
        result: state.resultState.result,
        userToken: state.userState.userToken,
    };
}

export default connect(mapStateToProps, {getAttempt, submit})(QuizView);
