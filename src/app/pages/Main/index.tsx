import React, {Component} from 'react';
import {connect} from 'react-redux';
import LogoSvg from './../../assets/img/logo.svg';
import ArrowSvg from './../../assets/img/arrow.svg';
import LoginButton from '../../components/LoginButton';
import MiniQuiz from '../../components/MiniQuiz';
import {AppState} from '../../redux/reducers';
import {QuizState} from '../../redux/quiz/types';
import fetchMiniQuizzes from '../../redux/quiz/thunk';
import './main.scss';

interface MainProps {
    quizState: QuizState,
    fetchMiniQuizzes: any,
}

class Main extends Component<MainProps> {

    componentDidMount() {
        this.props.fetchMiniQuizzes();
    }

    renderMiniQuizzes() {
        return (
            <MiniQuiz />
        );
    }

    render() {
        return (
            <div>
                <div className='main-background-primary h-100vh'>
                    <div className='container-fluid p-5 h-100'>
                        <div className='row justify-content-end'>
                            <LoginButton />
                        </div>
                        <div className='row justify-content-center mt-5'>
                            <img alt='logo' src={LogoSvg} />
                        </div>
                        <div className='row justify-content-center mt-2'>
                            <h1 className='text-white'>
                                Welcome to Grid Dynamics
                            </h1>
                        </div>
                        <div className='row justify-content-center my-5'>
                            <h1 className='main-title'>
                                Quiz
                            </h1>
                        </div>
                        <div className='row justify-content-center h-50 mt-5'>
                            <img alt='arrow' src={ArrowSvg} />
                        </div>
                    </div>
                </div>
                <div className='main-background-accent h-100vh'>
                    {this.renderMiniQuizzes()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {miniQuizzes: state.quizState.miniQuizzes};
}

export default connect(mapStateToProps, {fetchMiniQuizzes})(Main);
