import React, {Component, CSSProperties} from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../redux/reducers';
import {submit} from '../../redux/result/thunk';
import Navbar from '../../components/Navbar';
import Result from '../../model/Result';
import Stopwatch from '../../components/Navbar/Stopwatch';
import {DEFAULT_COLOR} from '../../components/Miniquiz';
import QuestionView from './QuestionView';
import {getProgress} from '../../redux/progress/thunk';
import Progress from '../../model/Progress';
import {cleanProgress, updateProgress} from '../../redux/progress/action';
import {Answer} from '../../model/Answers';
import ResultDialog from '../../components/ResultDialog';
import {cleanResult} from '../../redux/result/action';
import {User} from '../../model/User';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';

interface QuizProps {
    currentColor: string;
    isFinished: boolean;
    progress?: Progress;
    result?: Result;
    user: User;
    match: any;
    submit: any;
    getProgress: any;
    updateProgress: any;
    error?: string;
    cleanResult: typeof cleanResult;
    cleanProgress: typeof cleanProgress;
}

class QuizView extends Component<QuizProps> {
    componentDidMount() {
        const {user, match} = this.props;
        this.props.getProgress(user.id, match.params.id);
    }

    componentWillUnmount() {
        this.props.cleanProgress();
        this.props.cleanResult();
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

    render() {
        const {progress, currentColor, result, isFinished, submit, user, cleanProgress, error} = this.props;
        const style: CSSProperties = {background: currentColor || DEFAULT_COLOR};

        if (progress && isFinished) {
            submit(user.id,
                {quizId: progress.quiz.id, answers: progress.answers});
            cleanProgress();
        }

        return (
            <div className='min-h-100vh' style={style}>
                {
                    !progress && (
                        error ? <Error error={error} /> :
                            <Spinner className='d-flex justify-content-center align-items-center h-100vh' />
                    )
                }
                {
                    progress && !isFinished &&
                    <div>
                        <Navbar>
                            <Stopwatch start={new Date(progress.start!)} />
                        </Navbar>
                        <QuestionView
                          quiz={progress.quiz}
                          question={progress.question}
                          onClick={this.handelAnswer.bind(this)}
                        />
                    </div>
                }
                {
                    result &&
                    <ResultDialog
                      result={result}
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
        user: state.userState.user!,
        currentColor: state.progressState.currentColor!,
        isFinished: state.progressState.isFinished,
        error: state.progressState.error,
    };
}

export default connect(mapStateToProps,
    {getProgress, submit, updateProgress, cleanProgress, cleanResult})(
    QuizView);
