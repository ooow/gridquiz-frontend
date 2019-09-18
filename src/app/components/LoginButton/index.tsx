import React, {Component} from 'react';
import LockSvg from './../../assets/img/lock.svg';
import {connect} from 'react-redux';
import {AppState} from '../../redux/reducers';
import {toggleLoginDialog} from '../../redux/user/action';

interface LoginButtonProps {
    toggleLoginDialog: any,
}

class LoginButton extends Component<LoginButtonProps> {
    render() {
        const {toggleLoginDialog} = this.props;

        return (
            <img
                alt='Login button'
                className='cursor-pointer'
                onClick={toggleLoginDialog}
                src={LockSvg}
            />
        );
    }
}

function mapStateToProps(state: AppState) {
    return {};
}

export default connect(mapStateToProps, {toggleLoginDialog})(LoginButton);
