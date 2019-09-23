import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../redux/reducers';
import {User} from '../../model/User';
import Navbar from '../../components/Navbar';
import AuthButton from '../../components/Navbar/AuthButton';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import CreateQuiz from './CraeteQuiz';
import './style.scss';

interface AdminPanelProps {
    user?: User,
}

interface AdminPanelState {
}

class AdminPanel extends Component<AdminPanelProps, AdminPanelState> {
    render() {
        return (
            <div id='admin-page'>
                <Navbar activeLinkToHome={true}>
                    <AuthButton />
                </Navbar>
                <div className='container'>
                    <Tabs id="admin-panel-tabs" defaultActiveKey='create-quiz'>
                        <Tab
                            eventKey='user-control'
                            title='Users control'
                            tabClassName='tab text-inline'
                        >
                            Users control
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
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        user: state.userState.user,
    };
}

export default connect(mapStateToProps)(AdminPanel);
