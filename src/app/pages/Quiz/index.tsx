import React, {Component} from 'react';
import MiniQuiz from '../../model/MiniQuiz';

interface QuizProps {
    quiz: MiniQuiz;
}

class Quiz extends Component<QuizProps> {
    render() {
        return (
            <div>
                Hi
            </div>
        );
    }
}

export default Quiz;
