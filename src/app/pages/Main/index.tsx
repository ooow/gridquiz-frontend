import React, {Component} from 'react';
import {connect} from 'react-redux';
import MiniQuizView from '../../components/Miniquiz';
import {AppState} from '../../redux/reducers';
import MiniQuiz from '../../model/MiniQuiz';
import {fetchMiniQuizzes, fetchMiniQuizzesByUser} from '../../redux/quiz/thunk';
import {toggleLoginDialog} from '../../redux/user/action';
import {UserToken} from '../../model/User';
import LoginDialog from '../../components/LoginDialog';
import NavbarWrapper from '../../components/Navbar/NavbarWrapper';
import AuthButton from '../../components/Navbar/AuthButton';
import AdminButton from '../../components/Navbar/AdminButton';
import UserInfo from '../../components/Navbar/UserInfo';
import {Link} from 'react-router-dom';
import './style.scss';

interface MainProps {
    fetchMiniQuizzes: any,
    fetchMiniQuizzesByUser: any,
    toggleLoginDialog: any,
    startProgress: any,
    miniQuizzes: MiniQuiz[],
    userToken?: UserToken,
}

class Main extends Component<MainProps> {
    componentDidMount() {
        const {userToken} = this.props;
        userToken ? this.props.fetchMiniQuizzesByUser(userToken.user.id)
            : this.props.fetchMiniQuizzes();
    }

    componentDidUpdate(prevProps: MainProps) {
        if (this.props.userToken !== prevProps.userToken) {
            this.updateMiniQuizzes();
        }
    }

    updateMiniQuizzes() {
        const {userToken} = this.props;
        userToken ? this.props.fetchMiniQuizzesByUser(userToken.user.id)
            : this.props.fetchMiniQuizzes();
    }

    renderMiniquiz(miniQuiz: MiniQuiz) {
        const {toggleLoginDialog, userToken} = this.props;

        if (userToken) {
            return miniQuiz.attempt ?
                <MiniQuizView miniQuiz={miniQuiz} key={miniQuiz.id}>
                    {
                        miniQuiz.attempt &&
                        <Link
                          to='/dashboard'
                          className='results-link'
                          style={{color: miniQuiz.color}}
                        >
                            RESULTS
                        </Link>
                    }

                </MiniQuizView> :
                <Link to={`/quiz/${miniQuiz.id}`} key={miniQuiz.id}>
                    <MiniQuizView miniQuiz={miniQuiz} />
                </Link>;
        }

        return (
            <div onClick={toggleLoginDialog} key={miniQuiz.id}>
                <MiniQuizView miniQuiz={miniQuiz} />
            </div>
        );
    }

    render() {
        const {userToken, miniQuizzes} = this.props;

        return (
            <div id='main'>
                {!userToken && <LoginDialog />}
                <NavbarWrapper>
                    <UserInfo className='user-info mr-4' />
                    <AdminButton className='cursor-pointer mr-4' />
                    <AuthButton className='cursor-pointer' />
                </NavbarWrapper>
                <div className='content'>
                    <div className='d-flex justify-content-center align-items-center h-100'>
                        {
                            miniQuizzes &&
                            miniQuizzes.map((q: MiniQuiz) =>
                                this.renderMiniquiz(q))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        miniQuizzes: state.quizState.miniQuizzes,
        userToken: state.userState.userToken,
    };
}

export default connect(
    mapStateToProps,
    {
        fetchMiniQuizzes,
        fetchMiniQuizzesByUser,
        toggleLoginDialog,
    },
)(Main);
