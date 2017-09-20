import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {css} from 'aphrodite';
import styles from './styles/AppStyles';

import Back from './img/back.svg';

import HomeHead from "./Homehead";

class App extends Component {

    constructor(props) {
        super(props);
    }

    showQuiz(quiz) {
        let quizColor = `url(${Back})` + ", linear-gradient(180deg, " + quiz.colors[0].code + " 0%, " + quiz.colors[1].code + " 100%)";
        return (
            <Link to={"/quiz/" + quiz.id + "/question/1"} key={quiz.id} className={css(styles.quiz)}>
                <div className={css(styles.quizName)} style={{background: quizColor}}>
                    {quiz.name}
                </div>
                <div className={css(styles.description)}>
                    <div className={css(styles.descriptionText)}>{quiz.description}</div>
                    <div className={css(styles.questionText)}>{quiz.questions.length}</div>
                </div>
            </Link>
        )
    }

    showRegistrationForm() {
        return (
            <div className="register">
                <div className="modal-backdrop">
                </div>
                <div className="modal-window">
                    <h1 className="modal-title">Registration</h1>
                    <div className="modal-comment">
                        You might be a happy winner! Register to get a chance to win amazing prizes! Good luck!
                    </div>
                    <form className="modal-form">
                        <input className="modal-input" type="text" placeholder="Name"/>
                        <input className="modal-input" type="text" placeholder="Email"/>
                        <input className="modal-input" type="text" placeholder="Phone"/>
                        <input className="modal-submit" type="submit"/>
                        <input className="modal-submit" type="submit"/>
                    </form>
                </div>
            </div>
        );
    }

    componentWillUnmount() {
        this.props.cleanAnswersStory();
        this.props.cleanResultStory();
    }


    render() {
        return (
            <div className="page">
                {/* {this.showRegistrationForm()}*/}

                <HomeHead/>

                <div className={css(styles.container)}>
                    <div className={css(styles.quizzes)}>
                        {this.props.quizzes.map(i =>
                            this.showQuiz(i)
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        quizzes: state.quizzes
    }),
    dispatch => ({
        cleanAnswersStory: () => {
            dispatch({type: 'CLEAN_ANSWERS_STORY', payload: []});
        }
        ,
        cleanResultStory: () => {
            dispatch({type: 'CLEAN_RESULT_STORY', payload: []});
        }
    })
)(App);
