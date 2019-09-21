import React, {Component, CSSProperties} from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../redux/reducers';
import {UserToken} from '../../model/User';
import {submit} from '../../redux/result/thunk';
import Navbar from '../../components/Navbar';
import Result from '../../model/Result';
import Stopwatch from '../../components/Navbar/Stopwatch';
import {defaultColor} from '../../components/Miniquiz';
import QuestionView from '../../components/QuestionView';
import {getProgress} from '../../redux/progress/thunk';
import Progress from '../../model/Progress';
import {cleanProgress, updateProgress} from '../../redux/progress/action';
import {Answer} from '../../model/Answers';
import './style.scss';
import ResultDialog from '../../components/ResultDialog';

interface QuizProps {
    currentColor: string;
    getProgress: any;
    progress?: Progress;
    match: any;
    updateProgress: any;
    result?: Result;
    submit: any;
    userToken: UserToken;
    isFinished: boolean;
    cleanProgress: typeof cleanProgress;
}

interface QuizState {
}

class QuizView extends Component<QuizProps, QuizState> {
    componentDidMount() {
        const {userToken, match} = this.props;
        this.props.getProgress(userToken.user.id, match.params.id);
    }

    handelAnswer(index: number) {
        const {progress, updateProgress} = this.props;

        const answer: Answer = {
            questionId: progress!.question!.id,
            answer: progress!.question!.answers[index],
        };

        const newQuestionIndex = progress!.questionIndex + 1;
        const newAnswers = [...progress!.answers, answer];
        const newQuestion = progress!.quiz.questions[newQuestionIndex];
        const newProgress: Progress = {
            ...progress!,
            answers: newAnswers,
            question: newQuestion,
            questionIndex: newQuestionIndex,
        };

        updateProgress(newProgress);
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
        const {progress, currentColor, result, isFinished, submit, userToken, cleanProgress} = this.props;
        const style: CSSProperties = {background: currentColor || defaultColor};

        if (progress && isFinished) {
            submit(userToken.user.id,
                {quizId: progress.quiz.id, answers: progress.answers});
            cleanProgress();
        }

        return (
            <div className='h-100vh' style={style}>
                {
                    progress && !isFinished &&
                    <div>
                        {this.renderNavbar(new Date(progress.start!))}
                        {this.renderQuizBody()}
                    </div>
                }
                {
                    result &&
                    <ResultDialog
                      result={`${result.points}/${result.outOf}`}
                      resultColor={currentColor}
                    />
                }
            </div>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        progress: state.progressState.progress,
        result: state.resultState.result,
        userToken: state.userState.userToken!,
        currentColor: state.progressState.currentColor!,
        isFinished: state.progressState.isFinished,
    };
}

export default connect(mapStateToProps,
    {getProgress, submit, updateProgress, cleanProgress})(
    QuizView);
