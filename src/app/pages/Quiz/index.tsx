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

interface QuizProps {
    attempt: Attempt
    userToken: UserToken;
    match: any;
    getAttempt: any
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

    componentDidMount() {
        const {userToken, match} = this.props;
        this.props.getAttempt(userToken.user, match.params.id);
    }

    private nextQuestion() {
        const {quiz} = this.props.attempt;
        if (this.state.currentQuestionIndex < quiz.questions.length - 1) {
            this.setState((prevState: QuizState) =>
                ({currentQuestionIndex: prevState.currentQuestionIndex + 1}));
        } else {
            this.setState({finished: true});
        }
    }

    renderNavbar() {
        const {attempt} = this.props;
        const start = new Date(attempt.result.startTime);
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

    renderAnswer(body: string, index: number) {
        return (
            <div
                className='d-flex m-5 p-3 cursor-pointer border border-info'
                onClick={this.nextQuestion.bind(this)}
                key={index}
            >
                <div>{index + 1}</div>
                |
                <div>{body}</div>
            </div>
        );
    }

    renderQuizBody() {
        const {quiz} = this.props.attempt;
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
                    {question.answers.map((a, i) => this.renderAnswer(a, i))}
                </div>
            </div>
        );
    }

    render() {
        const {attempt} = this.props;
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
                    finished &&
                    <div className='row justify-content-center mt-5 pt-5'>
                        Quiz is Finished!
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        attempt: state.quizState.attempt,
        userToken: state.userState.userToken,
    };
}

export default connect(mapStateToProps, {getAttempt})(QuizView);
