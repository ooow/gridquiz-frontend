import React, {Component} from 'react';
import UnlockSvg from './../../assets/img/unlock.svg';
import {connect} from 'react-redux';
import {logout} from '../../redux/user/action';

interface LogoutButtonProps {
    logout: typeof logout;
}

class LogoutButton extends Component<LogoutButtonProps> {
    logout() {
        this.props.logout();
    }

    render() {
        return (
            <div>
                <img
                    alt='Logout button'
                    className='cursor-pointer'
                    onClick={this.logout.bind(this)}
                    src={UnlockSvg}
                />
            </div>
        );
    }
}

export default connect(() => {}, {logout})(LogoutButton);
