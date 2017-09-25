import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {css} from 'aphrodite';
import styles from './styles/AppStyles';
import {isAlpha, isEmail, isMobilePhone} from 'validator';

import Pattern from './img/background_pattern.svg';
import Send from './img/send.svg';
import Close from './img/close.svg';
import Lock from './img/lock.svg';
import Unlock from './img/unlock.svg';

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

    showCommonQuiz(quiz) {
        let quizColor = `url(${Pattern})` + ", linear-gradient(180deg, " + quiz.colors[0].code + " 0%, " + quiz.colors[1].code + " 100%)";
        return (
            <div onClick={this.showRegistration} key={quiz.id} className={css(styles.quiz)}>
                <div className={css(styles.quizName)} style={{background: quizColor}}>
                    {quiz.name}
                </div>
                <div className={css(styles.description)}>
                    <div className={css(styles.descriptionText)}>{quiz.description}</div>
                    <div className={css(styles.questionText)}>{quiz.questionsSize}</div>
                </div>
            </div>
        )
    }

    showUserQuiz(quiz) {
        let quizColor = `url(${Pattern})` + ", linear-gradient(180deg, " + quiz.colors[0].code + " 0%, " + quiz.colors[1].code + " 100%)";

        if (quiz.attempt) {
            return (
                <div key={quiz.id} className={css(styles.quiz)}>
                    <div className={css(styles.quizName)} style={{background: quizColor}}>
                        {quiz.name}
                    </div>
                    <div className={css(styles.description)}>
                        <div className={css(styles.descriptionText)}>{quiz.description}</div>
                        <div className={css(styles.questionScore)}>
                            {quiz.questionsComplete}/{quiz.questionsSize} your score!
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <Link to={"/quiz/" + quiz.id + "/question/1"} key={quiz.id} className={css(styles.quiz)}>
                    <div className={css(styles.quizName)} style={{background: quizColor}}>
                        {quiz.name}
                    </div>
                    <div className={css(styles.description)}>
                        <div className={css(styles.descriptionText)}>{quiz.description}</div>
                        <div className={css(styles.questionText)}>{quiz.questionsComplete}/{quiz.questionsSize}</div>
                    </div>
                </Link>
            )
        }
    }

    showRegistration() {
        if (this.state.user === null) {
            this.setState({showRegistration: true});
        }
        else {
            this.setState({showRegistration: false});
        }
    }

    showRegistrationForm() {
        return (
            <div className={css(styles.registrationForm)}>
                <div className={css(styles.backdrop)} onClick={this.showRegForm}/>
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
                        <img className={css(styles.modalPlaceButton)} src={Close}
                             onClick={this.showRegForm} alt="Close"/>
                        <img className={css(styles.modalPlaceButton)} src={Send}
                             onClick={this.authUser} alt="Send"/>
                    </div>
                </div>
            </div>
        );
    }

    showQuizzes() {
        return (
            <div className={css(styles.container)} style={{background: `url(${Pattern})`}}>
                <div className={css(styles.quizzes)}>
                    {this.props.quizzes.map(i =>
                        !this.props.user && this.showCommonQuiz(i)
                        ||
                        this.props.user && this.showUserQuiz(i)
                    )}
                </div>
            </div>
        )
    }

    logout() {
        localStorage.clear();
        this.setState({user: null, quizzes: []});
        this.props.logout();
        this.props.loadQuizzes();
    }

    showLogin() {
        return (
            <div className={css(styles.unlockContainer)}>
                <img onClick={this.showRegForm} src={Lock} className={css(styles.unlock)} alt="logout"/>
            </div>
        )
    }

    showLogout() {
        return (
            <div className={css(styles.unlockContainer)}>
                <img onClick={this.logout} src={Unlock} className={css(styles.unlock)} alt="login"/>
            </div>
        )
    }

    showRegForm() {
        this.setState({showRegistration: !this.state.showRegistration});
    }

    componentWillUnmount() {
        this.props.cleanAnswersStory();
        this.props.cleanResultStory();
    }

    componentWillMount() {
        if (this.state.user === null) {
            this.props.loadQuizzes();
        }
        else {
            this.props.loadUserHistory(this.state.user.token)
        }

        this.props.cleanQuiz();
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
