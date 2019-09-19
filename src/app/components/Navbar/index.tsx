import React, {Component} from 'react';
import {Role, UserToken} from '../../model/User';
import {connect} from 'react-redux';
import {AppState} from '../../redux/reducers';
import AdminButton from '../AdminButton';
import Logo from '../Logo';
import LogoutButton from '../LogoutButton';
import LoginButton from '../LoginButton';
import './style.scss';

interface NavbarProps {
    userToken?: UserToken,
}

class Navbar extends Component<NavbarProps> {
    showAdminButton() {
        const {userToken} = this.props;

        return userToken && userToken.user.role === Role.ADMIN &&
          <AdminButton />;
    }

    showLogButton() {
        const {userToken} = this.props;

        return userToken ? <LogoutButton /> : <LoginButton />;
    }

    showUserInfo() {
        const {userToken} = this.props;

        return userToken && (
            <div className='user-info text-white mr-4'>
                {userToken.user.name}
            </div>
        );
    }

    render() {
        return (
            <div id='navbar' className='container pt-3'>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-start'>
                        <Logo className='navbar-logo' />
                        <div className='d-flex flex-column ml-2'>
                            <h1 className='navbar-title'>Quiz</h1>
                            <p className='navbar-subtitle'>
                                by Grid Dynamics
                            </p>
                        </div>
                    </div>
                    <div className='d-flex'>
                        {this.showUserInfo()}
                        {this.showAdminButton()}
                        {this.showLogButton()}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {userToken: state.userState.userToken};
}

export default connect(mapStateToProps)(Navbar);
