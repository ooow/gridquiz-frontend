import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../redux/reducers';
import MiniQuiz from '../../model/MiniQuiz';
import {fetchMiniQuizzes, fetchMiniQuizzesByUser} from '../../redux/quiz/thunk';
import {toggleAuthDialog} from '../../redux/user/action';
import {User} from '../../model/User';
import AuthDialog from '../../components/AuthDialog';
import NavbarWrapper from '../../components/Navbar/NavbarWrapper';
import AuthButton from '../../components/Navbar/AuthButton';
import AdminButton from '../../components/Navbar/AdminButton';
import UserInfo from '../../components/Navbar/UserInfo';
import Spinner from '../../components/Spinner';
import MiniQuizWrapper from '../../components/Miniquiz/MiniQuizWrapper';
import './style.scss';

interface MainProps {
    fetchMiniQuizzes: any;
    fetchMiniQuizzesByUser: any;
    toggleAuthDialog: any;
    startProgress: any;
    miniQuizzes: MiniQuiz[];
    isMiniQuizzesFetching: boolean;
    user?: User;
}

class Main extends Component<MainProps> {
    componentDidMount() {
        const {user} = this.props;
        user ? this.props.fetchMiniQuizzesByUser(user.id)
            : this.props.fetchMiniQuizzes();
    }

    componentDidUpdate(prevProps: MainProps) {
        if (this.props.user !== prevProps.user) {
            this.updateMiniQuizzes();
        }
    }

    updateMiniQuizzes() {
        const {user} = this.props;
        user ? this.props.fetchMiniQuizzesByUser(user.id)
            : this.props.fetchMiniQuizzes();
    }

    render() {
        const {user, miniQuizzes, isMiniQuizzesFetching} = this.props;

        return (
            <div id='main'>
                {!user && <AuthDialog />}
                <NavbarWrapper>
                    <UserInfo />
                    <AdminButton className='cursor-pointer mr-4' />
                    <AuthButton />
                </NavbarWrapper>
                <div className='content'>
                    <div className='d-flex flex-wrap justify-content-center align-items-center h-100'>
                        {
                            !isMiniQuizzesFetching && miniQuizzes ?
                                miniQuizzes.map((q: MiniQuiz) =>
                                    <MiniQuizWrapper miniQuiz={q} user={user} key={q.id} />)
                                :
                                <Spinner />
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
        isMiniQuizzesFetching: state.quizState.isFetching,
        user: state.userState.user,
    };
}

export default connect(
    mapStateToProps,
    {
        fetchMiniQuizzes,
        fetchMiniQuizzesByUser,
        toggleAuthDialog,
    },
)(Main);
