import React, {Component} from 'react';
import {connect} from 'react-redux';
import {isAlpha, isEmail, isMobilePhone} from 'validator';
import Link from 'react-router-dom/es/Link';

import {css} from 'aphrodite';


import Send from './img/send.svg';
import Logo from './img/logo.svg'
import Unlock from './img/unlock.svg';

import {authUser} from './actions/authuser';
import User from './models/User';
import UsersGrid from './UsersGrid';
import NonApprovedUsersResults from './NonApprovedUsersResults';

class AdminPanel extends Component {

    constructor(props) {
        super(props);

        ['showRegistration', 'authUser', 'showRegForm', 'logout'].forEach((method) => {
            this[method] = this[method].bind(this);
        });

        this.state = {
            showRegistration: false,
            user: JSON.parse(localStorage.getItem('user'))
        };

        if (this.state.user) {
            if (this.state.user.role === 'ADMIN') {
                this.props.checkAuth(this.state.user);
            }
            else {
                localStorage.clear();
            }
        }
    }

    showHead() {
        return (
            <div className='admin-head-container'>
                <Link to='/'>
                    <img className='admin-logo' src={Logo} alt='logo'/>
                </Link>
                <div className='admin-head-title'>Admin Panel</div>
            </div>
        );
    }

    showUsers() {
        return <UsersGrid/>
    }

    showNonApprovedUsersResults() {
        return <NonApprovedUsersResults/>
    }

    validateFields() {
        let validate = true;

        if (isEmail(this.email.value)) {
            return validate;
        }

        if (!isEmail(this.email.value)) {
            this.email.value = '';
            this.email.placeholder = 'Please set Email';
            validate = false;
        }

        if (!isMobilePhone(this.phone.value, 'ru-RU')) {
            this.phone.value = '';
            this.phone.placeholder = 'or Phone';
            validate = false;
        }

        return validate;
    }

    showRegistrationForm() {
        return (
            <div>
                <div className='registration-modal'>
                    <div className='registration-modal-wrapper'>
                        <div className='registration-modal-header'>
                            <div className='registration-modal-title'>Admin Panel</div>
                        </div>
                        <div className='registration-modal-content'>
                            <input className='registration-modal-input' type='text' placeholder='Email' maxLength='40'
                                   ref={(input) => this.email = input}/>
                            <input className='registration-modal-input' type='text' placeholder='Phone' maxLength='12'
                                   ref={(input) => this.phone = input}/>
                        </div>
                        <div className='registration-modal-footer'>
                            <img className='registration-modal-button' src={Send}
                                 onClick={this.authUser} alt='Send'/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    showRegistration() {
        if (this.isAdmin(this.props.admin)) {
            this.setState({showRegistration: true});
        }
        else {
            this.setState({showRegistration: false});
        }
    }

    showRegForm() {
        this.setState({showRegistration: !this.state.showRegistration});
    }

    authUser() {
        if (!this.isAdmin(this.props.admin) && this.validateFields()) {
            this.props.authUser(new User(0, 'admin', this.email.value, this.phone.value));
            this.showRegForm();
            this.setState({user: this.props.admin});
            this.email.value = '';
            this.phone.value = '';
        }
    }

    showLogout() {
        return (
            <img onClick={this.logout} src={Unlock} className='unlock' alt='login'/>
        )
    }

    logout() {
        localStorage.clear();
        this.setState({user: null});
        this.props.logout();
    }

    componentWillMount() {
        if (this.state.user === null) {
            this.setState({showRegistration: true});
        }
    }

    isAdmin(user) {
        return user && user.role === 'ADMIN';
    }

    render() {
        return (
            <div className='page'>
                {!this.isAdmin(this.props.admin) && this.showRegistrationForm()}

                {this.isAdmin(this.props.admin) && this.showHead()}

                {this.isAdmin(this.props.admin) && this.showUsers()}

                {this.isAdmin(this.props.admin) && this.showNonApprovedUsersResults()}

                {this.isAdmin(this.props.admin) && this.showLogout()}
            </div>
        );
    }
}

export default connect(
    state => ({
        admin: state.user
    }),
    dispatch => ({
        authUser: (user) => {
            dispatch(authUser(user));
        },
        logout: () => {
            dispatch({type: 'LOGOUT_USER', payload: null})
        },
        checkAuth: (user) => {
            dispatch({type: 'AUTHENTICATION_USER', payload: user})
        }
    })
)(AdminPanel);
