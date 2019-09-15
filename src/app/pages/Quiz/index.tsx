import React, {Component} from 'react';
import {AppState} from '../../redux/reducers';
import {User} from '../../model/User';
import Quiz from '../../model/Quiz';
import {connect} from 'react-redux';
import {getQuiz} from '../../redux/quiz/thunk';

interface QuizProps {
    quiz?: Quiz
    user?: User;
    location: any;
    getQuiz: any
}

//TODO: Read quiz ID from url. To allow reload page. :(
class QuizView extends Component<QuizProps> {
    componentDidMount() {
        const {user, location} = this.props;
        const {miniQuiz} = location.state;
        this.props.getQuiz(user, miniQuiz.id);
    }

    render() {
        return (
            <div>
                Hi
            </div>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        quiz: state.quizState.quiz,
        user: state.userState.user,
    };
}

export default connect(mapStateToProps, {getQuiz})(QuizView);
