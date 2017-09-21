import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {css} from 'aphrodite';
import styles from './styles/AppStyles';

import Back from './img/back.svg';
import Send from './img/send.svg';
import Close from './img/close.svg';

import HomeHead from "./Homehead";
import {authUser} from "./actions/authuser";
import User from "./models/User";
import {loadQuizzes} from "./actions/loadquizess";
import {loadUserHistory} from "./actions/loaduserhistory";

class App extends Component {

    constructor(props) {
        super(props);

        ["showRegistration", "authUser", "closeRegistrationForm"].forEach((method) => {
            this[method] = this[method].bind(this);
        });

        this.state = {
            showRegistration: false,
            quizzes: [],
            user: JSON.parse(localStorage.getItem('user'))
        };

        if (this.state.user !== null) {
            this.props.checkAuth(this.state.user);
            this.user = this.state.user;
        }
    }

    showCommonQuiz(quiz) {
        let quizColor = `url(${Back})` + ", linear-gradient(180deg, " + quiz.colors[0].code + " 0%, " + quiz.colors[1].code + " 100%)";
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
        let quizColor = `url(${Back})` + ", linear-gradient(180deg, " + quiz.colors[0].code + " 0%, " + quiz.colors[1].code + " 100%)";

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

    authUser() {
        if (this.state.user === null) {
            this.props.authUser(new User(0, this.name.value, this.email.value, this.phone.value));
            this.closeRegistrationForm();
        }
    }

    closeRegistrationForm() {
        this.setState({showRegistration: false});
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
                <div className={css(styles.backdrop)}/>
                <div className={css(styles.modalPlace)}>
                    <div className={css(styles.modalPlaceTitle)}>Registration</div>
                    <div className={css(styles.modalPlaceComment)}>
                        You might be a happy winner! Register to get a chance to win amazing prizes! Good luck!
                    </div>
                    <input className={css(styles.modalPlaceInput)} type="text" placeholder="Name"
                           ref={(input) => this.name = input}/>
                    <input className={css(styles.modalPlaceInput)} type="text" placeholder="Email"
                           ref={(input) => this.email = input}/>
                    <input className={css(styles.modalPlaceInput)} type="text" placeholder="Phone"
                           ref={(input) => this.phone = input}/>

                    <div className={css(styles.buttonsContainer)}>
                        <img className={css(styles.modalPlaceButton)} src={Close}
                             onClick={this.closeRegistrationForm} alt="Close"/>
                        <img className={css(styles.modalPlaceButton)} src={Send}
                             onClick={this.authUser} alt="Send"/>
                    </div>
                </div>
            </div>
        );
    }

    showQuizzes() {
        return (
            <div className={css(styles.container)}>
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

                <HomeHead/>

                {this.showQuizzes()}
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
        checkAuth: (user) => {
            dispatch({type: 'AUTHENTICATION_USER', payload: user})
        }
    })
)(App);
