import React, {Component} from 'react';
import Navbar from 'reactstrap/lib/Navbar';
import NavItem from 'reactstrap/lib/NavItem';
import {connect} from 'react-redux';
import {AppState} from '../../redux/reducers';
import {UserToken} from '../../model/User';
import {getAttempt} from '../../redux/quiz/thunk';
import Attempt from '../../model/Attempt';
import Logo from '../../components/Logo';
import NavbarBrand from 'reactstrap/lib/NavbarBrand';
import Stopwatch from '../../components/Stopwatch';
import Question from '../../model/Question';
import {submit} from '../../redux/result/thunk';
import {Answer, Answers} from '../../model/Answers';
import Result from '../../model/Result';
import {Link} from 'react-router-dom';

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

    renderNavbar() {
        const {attempt} = this.props;
        const start = new Date(attempt!.result.startTime);
        return (
            <Navbar color="bg-light" light>
                <NavbarBrand>
                    <Logo />
                    <h1>QUIZ</h1>
                </NavbarBrand>

                <NavItem>
                    <Stopwatch start={start} />
                </NavItem>
            </Navbar>
        );
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
            <div className='container bg-light'>
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

    render() {
        const {attempt, result} = this.props;
        const {finished} = this.state;

        return (
            <div>
                {!finished && attempt &&
                <div>
                    {this.renderNavbar()}
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
