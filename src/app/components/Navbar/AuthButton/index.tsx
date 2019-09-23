import React, {Component} from 'react';
import LockSvg from '../../../assets/img/lock.svg';
import {connect} from 'react-redux';
import {logout, toggleLoginDialog} from '../../../redux/user/action';
import {AppState} from '../../../redux/reducers';
import UnlockSvg from '../../../assets/img/unlock.svg';
import {User} from '../../../model/User';
import {IconButton} from '@material-ui/core';

interface AuthButtonProps {
    user?: User,
    className?: string,
    logout?: typeof logout,
    toggleLoginDialog?: typeof toggleLoginDialog,
}

class AuthButton extends Component<AuthButtonProps> {
    static defaultProps: AuthButtonProps = {
        className: 'cursor-pointer',
    };

    showLogoutButton() {
        const {className, logout} = this.props;
        return (
            <IconButton
                className={className}
                onClick={logout}
                style={{width: 54}}
            >
                <img
                    alt='Auth button'
                    src={UnlockSvg}
                />
            </IconButton>
        );
    }

    showAuthButton() {
        const {className, toggleLoginDialog} = this.props;
        return (
            <IconButton
                className={className}
                onClick={toggleLoginDialog}
                style={{width: 54}}
            >
                <img
                    alt='Login button'
                    src={LockSvg}
                />
            </IconButton>
        );
    }

    render() {
        const {user} = this.props;
        return user ? this.showLogoutButton() : this.showAuthButton();
    }
}

function mapStateToProps(state: AppState) {
    return {user: state.userState.user};
}

export default connect(mapStateToProps,
    {toggleLoginDialog, logout})(
    AuthButton);
