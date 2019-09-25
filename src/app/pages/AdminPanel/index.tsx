import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../redux/reducers';
import Navbar, {SafeEmptyRender} from '../../components/Navbar';
import AuthButton from '../../components/Navbar/AuthButton';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import CreateQuiz from './CraeteQuiz';
import {ADMIN_CHECK_URL, getHeaders} from '../../redux/api';
import Spinner from '../../components/Spinner';
import './style.scss';
import UsersControl from './UsersControl';

interface AdminPanelState {
    isChecking: boolean;
}

class AdminPanel extends Component<any, AdminPanelState> {
    constructor(props: any) {
        super(props);

        this.state = {isChecking: true};
    }

    async componentDidMount() {
        const response = await fetch(ADMIN_CHECK_URL, {
            method: 'get',
            headers: getHeaders(),
        });
        if (!response.ok) {
            this.props.history.push('/');
        } else {
            this.setState({isChecking: false});
        }
    }

    navigateToHome() {
        this.props.history.push('/');
    }

    render() {
        const {user} = this.props;
        if (!user) {
            //TODO: Find a better way to cover this case.
            this.navigateToHome();
            return SafeEmptyRender;
        }

        const {isChecking} = this.state;

        return !isChecking ? (
                <div id='admin-page'>
                    <Navbar activeLinkToHome={true}>
                        <AuthButton />
                    </Navbar>
                    <div className='container'>
                        <Tabs id="admin-panel-tabs">
                            <Tab
                                eventKey='user-control'
                                title='Users control'
                                tabClassName='tab text-inline'
                            >
                                <UsersControl />
                            </Tab>
                            <Tab
                                eventKey='create-quiz'
                                title='Create Quiz'
                                tabClassName='tab text-inline'
                            >
                                <CreateQuiz />
                            </Tab>
                            <Tab
                                eventKey='quizzes'
                                title='Quizzes'
                                tabClassName='tab text-inline'
                            >
                                Quizzes
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            ) :
            <Spinner />;
    }
}

function mapStateToProps(state: AppState) {
    return {user: state.userState.user};
}

export default connect(mapStateToProps)(AdminPanel);
