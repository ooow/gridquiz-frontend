import React, {Component} from 'react';
import {connect} from 'react-redux';
import ArrowSvg from './../../assets/img/arrow.svg';
import LoginButton from '../../components/LoginButton';
import MiniQuizView from '../../components/MiniQuizView';
import {AppState} from '../../redux/reducers';
import MiniQuiz from '../../model/MiniQuiz';
import {fetchMiniQuizzes, fetchMiniQuizzesByUser} from '../../redux/quiz/thunk';
import {Role, UserToken} from '../../model/User';
import LogoutButton from '../../components/LogoutButton';
import LoginDialog from '../../components/LoginDialog';
import './style.scss';
import AdminButton from '../../components/AdminButton';
import Logo from '../../components/Logo';

interface MainProps {
    fetchMiniQuizzes: any,
    fetchMiniQuizzesByUser: any
    miniQuizzes: MiniQuiz[],
    userToken?: UserToken,
}

interface MainState {
    scrollY: number,
}

class Main extends Component<MainProps, MainState> {
    constructor(props: MainProps) {
        super(props);

        this.state = {scrollY: 0};
    }

    componentDidMount() {
        const {userToken} = this.props;
        userToken ? this.props.fetchMiniQuizzesByUser(userToken.user.id)
            : this.props.fetchMiniQuizzes();

        window.addEventListener('scroll', this.onScroll.bind(this));
    }

    componentDidUpdate(prevProps: MainProps) {
        if (this.props.userToken !== prevProps.userToken) {
            this.updateMiniQuizzes();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    onScroll() {
        this.setState({scrollY: window.scrollY || 0});
    }

    renderMiniQuizzes(miniQuizzes: MiniQuiz[]) {
        return miniQuizzes.map((q: MiniQuiz) => (
            <MiniQuizView miniQuiz={q} key={q.id} />
        ));
    }

    updateMiniQuizzes() {
        const {userToken} = this.props;
        userToken ? this.props.fetchMiniQuizzesByUser(userToken.user.id)
            : this.props.fetchMiniQuizzes();
    }

    render() {
        const {userToken, miniQuizzes} = this.props;
        const {scrollY} = this.state;

        console.log(this.state.scrollY);

        //let height = 100;
        let headerClassName = 'header background-primary';

        if (scrollY !== 0) {
            headerClassName += ' collapsed';
        }

        return (
            <div id='main'>
                {!userToken && <LoginDialog />}
                <div className={headerClassName}>
                    <div className='container-fluid p-5 h-100'>
                        <div className='row panel'>
                            {
                                userToken &&
                                userToken.user.role === Role.ADMIN &&
                                <AdminButton />
                            }
                            {!userToken && <LoginButton />}
                            {userToken && <LogoutButton />}
                        </div>
                        <div className='row justify-content-center mt-5'>
                            <Logo className='logo' />
                        </div>
                        <div className='row justify-content-center mt-5'>
                            <h1 className='text-white welcome-text'>
                                Welcome to Grid Dynamics
                            </h1>
                        </div>
                        <div className='row justify-content-center'>
                            <div>
                                <h1 className='title'>
                                    Quiz
                                </h1>
                                <p className='subtitle'>by Grid Dynamics</p>
                            </div>
                        </div>
                        <div className='row justify-content-center mt-5 arrow'>
                            <img alt='arrow' src={ArrowSvg} />
                        </div>
                    </div>
                </div>
                <div className='content'>
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
        userToken: state.userState.userToken,
    };
}

export default connect(
    mapStateToProps,
    {fetchMiniQuizzes, fetchMiniQuizzesByUser},
)(Main);
