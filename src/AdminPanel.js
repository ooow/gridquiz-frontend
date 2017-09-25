import React, {Component} from 'react';
import {connect} from 'react-redux';
import {isAlpha, isEmail, isMobilePhone} from 'validator';

import {css} from 'aphrodite';
import styles from './styles/AdminPanelStyles';


import Send from './img/send.svg';
import Logo from './img/logo.svg'
import UsersGrid from "./UsersGrid";
import {authUser} from "./actions/authuser";
import User from "./models/User";
import NonApprovedUsersResults from "./NonApprovedUsersResults";
import {generateMainQuizzes} from "./actions/generatemainquizzes";
import Link from "react-router-dom/es/Link";

class AdminPanel extends Component {

    constructor(props) {
        super(props);

        ["showRegistration", "authUser", "showRegForm", "logout", "generate"].forEach((method) => {
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
            <div className={css(styles.adminHeadContainer)}>
                <div className={css(styles.logoContainer)}>
                    <img className={css(styles.logo)} src={Logo} alt='logo'/>
                </div>
                <div className={css(styles.headTitle)}>Admin Panel</div>
            </div>
        );
    }

    showUsers() {
        return <UsersGrid/>
    }

    showNonApprovedUsersResults() {
        return <NonApprovedUsersResults/>
    }

    generate() {
        this.props.generate(this.state.user.token);
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
            this.setState({user: this.props.admin});
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

                {this.props.admin && this.showHead()}

                <div className={css(styles.menuContainer)}>
                    {this.props.admin &&
                    <div className={css(styles.adminButton)} onClick={this.generate}>Generate Main Quizzes</div>}

                    {this.props.admin &&
                    <Link to="/">
                        <div className={css(styles.adminButton)}>Go To Home</div>
                    </Link>}
                </div>

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
        },
        generate: (adminToken) => {
            dispatch(generateMainQuizzes(adminToken));
        }
    })
)(AdminPanel);
