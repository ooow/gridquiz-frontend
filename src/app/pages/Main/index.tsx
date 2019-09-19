import React, {Component} from 'react';
import {connect} from 'react-redux';
import MiniQuizView from '../../components/Miniquiz';
import {AppState} from '../../redux/reducers';
import MiniQuiz from '../../model/MiniQuiz';
import {fetchMiniQuizzes, fetchMiniQuizzesByUser} from '../../redux/quiz/thunk';
import {UserToken} from '../../model/User';
import LoginDialog from '../../components/LoginDialog';
import NavbarWrapper from '../../components/Navbar/NavbarWrapper';
import AuthButton from '../../components/Navbar/AuthButton';
import AdminButton from '../../components/Navbar/AdminButton';
import UserInfo from '../../components/Navbar/UserInfo';
import './style.scss';

interface MainProps {
    fetchMiniQuizzes: any,
    fetchMiniQuizzesByUser: any,
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

    renderMiniQuizzes(miniQuizzes: MiniQuiz[]) {
        return miniQuizzes.map((q: MiniQuiz) => (
            <MiniQuizView miniQuiz={q} key={q.id} />
        ));
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
        userToken: state.userState.userToken,
    };
}

export default connect(
    mapStateToProps,
    {fetchMiniQuizzes, fetchMiniQuizzesByUser},
)(Main);
