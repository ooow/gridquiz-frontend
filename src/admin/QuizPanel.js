import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUsers} from "../actions/getusers";
import {removeUsers} from "../actions/removeusers";

class QuizPanel extends Component {

    constructor(props) {
        super(props);

        ["addQuestion", "addQuiz", "addAnswer"].forEach((method) => {
            this[method] = this[method].bind(this);
        });

        this.state = {
            columns: [],
            selectedRows: []
        };
    }


    addAnswer() {
        return (
            <div>
                <div>
                    <input type="textarea" placeholder="answer"/>
                    <input name="rightAnswer" type="radio"/>
                    <input type="checkbox"/>
                </div>
                <div>
                    <input type="textarea" placeholder="answer1"/>
                    <input name="rightAnswer" type="radio"/>
                    <input type="checkbox"/>
                </div>
                <div>
                    <input type="textarea" placeholder="answer1"/>
                    <input name="rightAnswer" type="radio"/>
                    <input type="checkbox"/>
                </div>
                <div>
                    <input type="textarea" placeholder="answer1"/>
                    <input name="rightAnswer" type="radio"/>
                    <input type="checkbox"/>
                </div>
            </div>
        )
    }


    addQuestion() {
        return (
            <div>
                <input type="textarea" placeholder="question"/>
            </div>
        )
    }

    addQuiz() {
        return (
            <div className="add-quiz">
                <button>Save Quiz</button>
                <input type="text" placeholder="Quiz Name"/>
                <button>Add Question</button>
                {this.addQuestion()}
                <button>Add Answer</button>
                {this.addAnswer()}
            </div>
        );
    }


    render() {
        return (
            <div>
                {this.addQuiz()}
            </div>
        );
    }
}

export default connect(
    state => ({}),
    dispatch => ({
        getUsers: () => {
            dispatch(getUsers());
        },
        removeUsers: (usersIds) => {
            dispatch(removeUsers(usersIds));
        }
    })
)(QuizPanel);