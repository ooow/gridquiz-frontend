import React, {Component} from 'react';
import {connect} from 'react-redux';
import {isAlpha, isEmail, isMobilePhone} from 'validator';

import {css} from 'aphrodite';
import styles from '../styles/AppStyles';


import Send from '../img/send.svg';
import Logo from '../img/logo.svg'
import UsersGrid from "../UsersGrid";
import QuizPanel from "./QuizPanel";
import {authUser} from "../actions/authuser";
import User from "../models/User";
import NonApprovedUsersResults from "../NonApprovedUsersResults";

class AdminPanel extends Component {

    constructor(props) {
        super(props);


        ["showRegistration", "authUser", "showRegForm", "logout"].forEach((method) => {
            this[method] = this[method].bind(this);
        });

        this.state = {
            showRegistration: false,
            user: JSON.parse(localStorage.getItem('user'))
        };

        if (this.state.user) {
            if (this.state.user.role === "ADMIN") {
                this.props.checkAuth(this.state.user);
            }
        }
    }

    showHead() {
        return (
            <div className="a-container">
                <div className="a-bar">
                    <img className="a-logo" src={Logo}/>
                    <div className="a-quiz-title">Quiz</div>
                    <div className="a-line">
                        <div className="a-author-text">by Grid Dynamics</div>
                    </div>
                    <h1 className="a-title">Admin Panel</h1>
                </div>
            </div>
        );
    }

    showUsers() {
        return <UsersGrid/>
    }

    showNonApprovedUsersResults() {
        return <NonApprovedUsersResults/>
    }

    showQuizPanel() {
        return <QuizPanel/>
    }

    generateMainQuizzes() {

    }

    validateFields() {
        let validate = true;

        if (!isAlpha(this.name.value, 'en-US')) {
            this.name.value = "";
            this.name.placeholder = "Please set Name (a-z, A-Z)";
            validate = false;
        }

        if (isEmail(this.email.value) || isMobilePhone(this.phone.value, 'ru-RU')) {
            return validate;
        }

        if (!isEmail(this.email.value)) {
            this.email.value = "";
            this.email.placeholder = "Please set Email";
            validate = false;
        }

        if (!isMobilePhone(this.phone.value, 'ru-RU')) {
            this.phone.value = "";
            this.phone.placeholder = "or Phone";
            validate = false;
        }

        return validate;
    }

    showRegistrationForm() {
        return (
            <div className={css(styles.registrationForm)}>
                <div className={css(styles.backdrop)}/>
                <div className={css(styles.modalPlace)}>
                    <div className={css(styles.modalPlaceTitle)}>Registration</div>
                    <div className={css(styles.modalPlaceComment)}>
                        You might be a happy winner! Register to get a chance to win amazing prizes! Good luck!
                    </div>
                    <input className={css(styles.modalPlaceInput)} type="text" placeholder="Name" maxLength="24"
                           ref={(input) => this.name = input}/>
                    <input className={css(styles.modalPlaceInput)} type="text" placeholder="Email" maxLength="40"
                           ref={(input) => this.email = input}/>
                    <input className={css(styles.modalPlaceInput)} type="text" placeholder="Phone" maxLength="12"
                           ref={(input) => this.phone = input}/>

                    <div className={css(styles.buttonsContainer)}>
                        <img className={css(styles.modalPlaceButton)} src={Send}
                             onClick={this.authUser} alt="Send"/>
                    </div>
                </div>
            </div>
        );
    }

    showRegistration() {
        if (this.state.user === null) {
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
        if (this.state.user === null && this.validateFields()) {
            this.props.authUser(new User(0, this.name.value, this.email.value, this.phone.value));
            this.showRegForm();
        }
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

    render() {
        return (
            <div className="page">
                {this.state.showRegistration && this.showRegistrationForm()}

                {this.showHead()}

                {this.props.admin && this.showUsers()}

                {this.props.admin && this.showNonApprovedUsersResults()}
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
