import React, {Component} from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import OptionButton from './OptionButton';
import Quiz from '../../../model/Quiz';
import Question from '../../../model/Question';
import './style.scss';

interface QuestionProp {
    quiz: Quiz,
    question: Question,
    onClick: (index: number) => any;
}

class QuestionView extends Component<QuestionProp> {
    render() {
        const {quiz, question, onClick} = this.props;

        return (
            <div className='container'>
                <div className='row justify-content-center mt-2'>
                    <p className='quiz-name'>{quiz.name}</p>
                </div>
                <div className='row justify-content-center mt-1 mt-sm-3 px-4 px-sm-2'>
                    <p className='question-text'>{question.text}</p>
                </div>
                {
                    question.code &&
                    <SyntaxHighlighter language='java' className='code-block'>
                        {question.code}
                    </SyntaxHighlighter>
                }
                <div className='row justify-content-center mt-sm-5'>
                    {
                        question.answers.map((a, i) =>
                            <OptionButton
                                index={i + 1}
                                indexColor={quiz.color}
                                text={a}
                                key={i}
                                onClick={onClick.bind(this, i)}
                            />,
                        )
                    }
                </div>
            </div>
        );
    }
}

export default QuestionView;
