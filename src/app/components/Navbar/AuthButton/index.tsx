import React, {Component} from 'react';
import LockSvg from '../../../assets/img/lock.svg';
import {connect} from 'react-redux';
import {logout, toggleLoginDialog} from '../../../redux/user/action';
import {AppState} from '../../../redux/reducers';
import UnlockSvg from '../../../assets/img/unlock.svg';
import {UserToken} from '../../../model/User';

interface AuthButtonProps {
    userToken?: UserToken,
    className: string,
    logout: typeof logout,
    toggleLoginDialog: typeof toggleLoginDialog,
}

class AuthButton extends Component<AuthButtonProps> {
    logout() {
        this.props.logout();
    }

    showLogoutButton() {
        const {className} = this.props;
        return (
            <img
                alt='Logout button'
                className={className}
                onClick={this.logout.bind(this)}
                src={UnlockSvg}
            />
        );
    }

    showAuthButton() {
        const {className, toggleLoginDialog} = this.props;
        return (
            <img
                alt='Login button'
                className={className}
                onClick={toggleLoginDialog}
                src={LockSvg}
            />
        );
    }

    render() {
        const {userToken} = this.props;
        return userToken ? this.showLogoutButton() : this.showAuthButton();
    }
}

function mapStateToProps(state: AppState) {
    return {userToken: state.userState.userToken};
}

export default connect(mapStateToProps,
    {toggleLoginDialog, logout})(
    AuthButton);
