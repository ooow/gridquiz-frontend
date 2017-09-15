import React, {Component} from 'react';
import {connect} from 'react-redux';
import HomeHead from "./Homehead";
import {Link} from "react-router-dom";

class App extends Component {

    constructor(props) {
        super(props);
    }

    static showQuiz(quiz) {
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

    render() {
        return (
            <div className="page">
                <HomeHead/>

                <div className="container-2">
                    <div className="place">
                        {this.props.quizzes.map(i =>
                            App.showQuiz(i)
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
    dispatch => ({})
)(App);


