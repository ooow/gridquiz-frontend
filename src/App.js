import React, {Component} from 'react';
import {connect} from 'react-redux';
import HomeHead from "./Homehead";
import {Link} from "react-router-dom";

class App extends Component {

    constructor(props) {
        super(props);
    }

    showQuiz(quiz) {
        return (
            <Link to={"/quiz/" + quiz.id + "/question/1"} key={quiz.id} className="quiz">
                <div className="quiz-name">{quiz.name}</div>
                <div className="description">
                    <div className="description-text">{quiz.description}</div>
                    <div className="questions-text">{quiz.questions.length}</div>
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

                <div className="container-2">
                    <div className="place">
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


