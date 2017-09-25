import React, {Component} from 'react';
import {connect} from 'react-redux';
import {css} from 'aphrodite';
import {isAlpha, isEmail, isMobilePhone} from 'validator';

import HomeHead from "./Homehead";
import {authUser} from "./actions/authuser";
import User from "./models/User";
import {loadQuizzes} from "./actions/loadquizess";
import {loadUserHistory} from "./actions/loaduserhistory";

class App extends Component {

    constructor(props) {
        super(props);

        ["showRegistration", "authUser", "showRegForm", "logout"].forEach((method) => {
            this[method] = this[method].bind(this);
        });

        this.state = {
            showRegistration: false,
            quizzes: [],
            user: JSON.parse(localStorage.getItem('user'))
        };

        if (this.state.user !== null) {
            this.props.checkAuth(this.state.user);
        }
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

    authUser() {
        if (this.state.user === null && this.validateFields()) {
            this.props.authUser(new User(0, this.name.value, this.email.value, this.phone.value));
            this.showRegForm();
        }
    }

    render() {
        return (
            <div className=" page">
                {this.state.showRegistration && this.showRegistrationForm()}
                {this.props.user && this.showLogout()}
                {!this.props.user && this.showLogin()}

                <HomeHead/>

                {this.props.quizzes && this.showQuizzes()}
            </div>
        );
    }
}

export default connect(
    state => ({
        quizzes: state.quizzes,
        user: state.user
    }),
    dispatch => ({
        cleanAnswersStory: () => {
            dispatch({type: 'CLEAN_ANSWERS_STORY', payload: []});
        },
        cleanResultStory: () => {
            dispatch({type: 'CLEAN_RESULT_STORY', payload: []});
        },
        cleanQuiz: () => {
            dispatch({type: 'CLEAN_QUIZ', payload: []});
        },
        loadQuizzes: () => {
            dispatch(loadQuizzes());
        },
        loadUserHistory: (userToken) => {
            dispatch(loadUserHistory(userToken));
        },
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
)(App);
