import React, {Component} from 'react';
import {connect} from 'react-redux';
import LogoSvg from './../../assets/img/logo.svg';
import ArrowSvg from './../../assets/img/arrow.svg';
import LoginButton from '../../components/LoginButton';
import MiniQuizView from '../../components/MiniQuizView';
import {AppState} from '../../redux/reducers';
import MiniQuiz from '../../model/MiniQuiz';
import {fetchMiniQuizzes} from '../../redux/quiz/thunk';
import './style.scss';
import {User} from '../../model/User';
import LogoutButton from '../../components/LogoutButton';

interface MainProps {
    fetchMiniQuizzes: any,
    miniQuizzes: MiniQuiz[],
    user?: User,
}

class Main extends Component<MainProps> {
    componentDidMount() {
        this.props.fetchMiniQuizzes();
    }

    renderMiniQuizzes(miniQuizzes: MiniQuiz[]) {
        return miniQuizzes.map((q: MiniQuiz) => (
            <MiniQuizView miniQuiz={q} key={q.id} />
        ));
    }

    render() {
        const {user, miniQuizzes} = this.props;
        return (
            <div id='main'>
                <div className='main-background-primary h-100vh'>
                    <div className='container-fluid p-5 h-100'>
                        <div className='row justify-content-end'>
                            {!user && <LoginButton />}
                            {user && <LogoutButton />}
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
                    <div className='d-flex justify-content-center flex-wrap'>
                        {miniQuizzes && this.renderMiniQuizzes(miniQuizzes)}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        miniQuizzes: state.quizState.miniQuizzes,
        user: state.userState.user,
    };
}

export default connect(mapStateToProps, {fetchMiniQuizzes})(Main);
