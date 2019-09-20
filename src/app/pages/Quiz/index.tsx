import React, {Component, CSSProperties} from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../redux/reducers';
import {UserToken} from '../../model/User';
import {submit} from '../../redux/result/thunk';
import {getProgress} from '../../redux/quiz/thunk';
import Navbar from '../../components/Navbar';
import Result from '../../model/Result';
import Stopwatch from '../../components/Navbar/Stopwatch';
import {defaultColor} from '../../components/Miniquiz';
import ResultDialog from '../../components/ResultDialog';
import QuestionView from '../../components/QuestionView';
import Progress from '../../model/Progress';
import {nextQuestion, storeAnswer} from '../../redux/quiz/action';
import './style.scss';

interface QuizProps {
    getProgress: any;
    match: any;
    nextQuestion: any;
    progress?: Progress;
    result?: Result;
    storeAnswer: any;
    submit: any;
    userToken?: UserToken;
}

interface QuizState {
    finished: boolean;
}

class QuizView extends Component<QuizProps, QuizState> {
    constructor(props: QuizProps) {
        super(props);

        this.state = {finished: false};
    }

    componentDidMount() {
        const {userToken, match} = this.props;
        this.props.getProgress(userToken!.user, match.params.id);
    }

    handelAnswer(index: number) {
        const {nextQuestion, storeAnswer, submit, userToken, progress} = this.props;
        const {quiz, question, answers} = progress!;

        storeAnswer({questionId: question.id, answer: question.answers[index]});
        const nextIndex = quiz.questions.findIndex(q => question.id === q.id) + 1;
        if (nextIndex < quiz.questions.length) {
            nextQuestion(nextIndex);
        } else {
            submit(userToken!.user, {quizId: quiz.id, answers});
            this.setState({finished: true});
        }
    }

    renderQuizBody() {
        const {quiz, question} = this.props.progress!;

        return <QuestionView
            quiz={quiz}
            question={question}
            onClick={this.handelAnswer.bind(this)}
        />;
    }

    renderNavbar(startTime: Date) {
        return (
            <Navbar>
                <Stopwatch start={startTime} className='stopwatch' />
            </Navbar>
        );
    }

    render() {
        const {progress, result} = this.props;
        const {finished} = this.state;
        let style: CSSProperties = {background: defaultColor};

        if (progress) {
            style = {background: progress.quiz.color};
        }

        return (
            <div className='h-100vh' style={style}>
                {!finished && progress &&
                <div>
                    {this.renderNavbar(new Date(progress.start))}
                    {this.renderQuizBody()}
                </div>
                }
                {
                    finished && result && progress &&
                    <ResultDialog
                      result={`${result.points}/${result.outOf}`}
                      resultColor={progress.quiz.color}
                    />
                }
            </div>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        progress: state.quizState.progress,
        result: state.resultState.result,
        userToken: state.userState.userToken,
    };
}

export default connect(mapStateToProps,
    {getProgress, submit, nextQuestion, storeAnswer})(
    QuizView);
