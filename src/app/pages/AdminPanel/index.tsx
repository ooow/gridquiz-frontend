import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../redux/reducers';
import {User} from '../../model/User';

interface AdminPanelProps {
    user?: User,
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
        user: state.userState.user,
    };
}

export default connect(mapStateToProps)(AdminPanel);
