import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../redux/reducers';
import {UserToken} from '../../model/User';

interface AdminPanelProps {
    userToken?: UserToken,
}

interface AdminPanelState {
}

class AdminPanel extends Component<AdminPanelProps, AdminPanelState> {
    render() {
        return (
            <div>
                Hi Admin!
            </div>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        userToken: state.userState.userToken,
    };
}

export default connect(mapStateToProps)(AdminPanel);
