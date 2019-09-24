import React, {Component, CSSProperties, ReactNode} from 'react';
import MiniQuiz from '../../model/MiniQuiz';
import './style.scss';

export const defaultColor = '#F8F8F8';

interface MainQuizProp {
    miniQuiz: MiniQuiz;
    children?: ReactNode,
}

class MiniQuizView extends Component<MainQuizProp> {
    render() {
        const {miniQuiz, children} = this.props;
        const style: CSSProperties = {
            background: miniQuiz.color || defaultColor,
            opacity: miniQuiz.attempt ? 0.5 : 1,
        };

        return (
            <div
                id='mini-quiz'
                className='card shadow cursor-pointer border-0 m-3'
                style={style}
            >
                <p className='card-title d-flex align-items-start justify-content-center pt-sm-5 flex-fill text-inline name'>
                    {miniQuiz.name}
                </p>
                <div className='d-flex bg-white px-3 align-items-center justify-content-between'>
                    <div className='d-flex flex-column info-container'>
                        <p className='card-subtitle mt-2 mt-sm-4 description text-inline'>
                            {miniQuiz.description}
                        </p>
                        <p className='info text-inline'>
                            {miniQuiz.questionsComplete} / {miniQuiz.questionsSize} QUESTIONS
                        </p>
                    </div>
                    {children}
                </div>
            </div>
        );
    }
}

export default MiniQuizView;
