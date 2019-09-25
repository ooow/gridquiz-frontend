import React, {ChangeEvent, Component} from 'react';
import AddSvg from '../../../../assets/img/add.svg';
import {IconButton} from '@material-ui/core';

interface CreateAnswersProps {
    changeAnswers: (event: CreateAnswersState) => void;
}

export interface CreateAnswersState {
    answers: string[];
    correctAnswer: { index: number, value: string };
}

class CreateAnswers extends Component<CreateAnswersProps, CreateAnswersState> {
    constructor(props: CreateAnswersProps) {
        super(props);

        this.state = {answers: ['', ''], correctAnswer: {index: 0, value: ''}};
    }

    async changeAnswer(event: ChangeEvent<HTMLInputElement>, index: number) {
        const {answers, correctAnswer} = this.state;
        answers[index] = event.target.value;
        if (index !== correctAnswer.index) {
            await this.setState({answers: answers});
        } else {
            await this.setState({
                answers: answers,
                correctAnswer: {index: index, value: event.target.value},
            });
        }
        this.eventChange();

    }

    async changeConnectAnswer(index: number) {
        const {answers} = this.state;

        await this.setState({
            correctAnswer: {
                index: index,
                value: answers[index],
            },
        });
        this.eventChange();
    }

    async handleAddAnswer() {
        await this.setState({answers: [...this.state.answers, '']});
        this.eventChange();
    }

    async handelRemoveAnswer(index: number) {
        if (this.state.answers.length > index) {
            this.state.answers.splice(index, 1);
            await this.setState({answers: this.state.answers});
            this.eventChange();
        }
    }

    eventChange() {
        const {changeAnswers} = this.props;
        changeAnswers(this.state);
    }

    render() {
        const {answers, correctAnswer} = this.state;

        return (
            <div id='create-answers' className='container p-0'>
                <p>Correct answer: {correctAnswer.value}</p>
                {
                    answers.map((a, i) =>
                        <div className='input-group mb-3' key={i}>
                            <div className='input-group-prepend'>
                                <span className='input-group-text'>
                                    {`#${i + 1}`}
                                </span>
                            </div>
                            <input
                                type='text'
                                className='form-control'
                                placeholder={`Answer #${i + 1}`}
                                aria-label='Answer text'
                                value={a}
                                onChange={(e) => this.changeAnswer(e, i)}
                            />
                            <div className='input-group-append'>
                                <div className='input-group-text'>
                                    <input
                                        type='radio'
                                        name='correct-answer'
                                        aria-label='Correct answer'
                                        checked={correctAnswer.index === i}
                                        onChange={this.changeConnectAnswer.bind(
                                            this,
                                            i)}
                                    />
                                </div>
                            </div>
                            <div className='input-group-append'>
                                <button
                                    type='button'
                                    className='btn btn-outline-danger'
                                    onClick={this.handelRemoveAnswer
                                                 .bind(this, i)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>,
                    )
                }
                <div className='row justify-content-center pb-2'>
                    <IconButton onClick={this.handleAddAnswer.bind(this)}>
                        <img
                            alt='Add new answer'
                            src={AddSvg}
                            style={{width: 24}}
                        />
                    </IconButton>
                </div>
            </div>
        );
    }
}

export default CreateAnswers;
