import React, {ChangeEvent, Component} from 'react';
import {IconButton} from '@material-ui/core';
import AddSvg from '../../../assets/img/add.svg';
import CloseSvg from '../../../assets/img/close.svg';
import CreateQuestion from './CreateQuestion';
import {NewQuestion} from '../../../model/Question';
import {AppState} from '../../../redux/reducers';
import {connect} from 'react-redux';
import {save} from '../../../redux/quiz/thunk';
import Quiz from '../../../model/Quiz';
import Spinner from '../../../components/Spinner';
import ColorPicker from './ColorPicker';

interface CreateQuizProps {
    quiz?: Quiz,
    isFetching: boolean
    error?: string,
    save: any;
}

interface CreateQuizState {
    name: string;
    description: string;
    color: string;
    questions: NewQuestion[];
    displayCreateQuestion: boolean;
}

class CreateQuiz extends Component<CreateQuizProps, CreateQuizState> {
    constructor(props: CreateQuizProps) {
        super(props);

        this.state = {
            name: '',
            description: '',
            color: '#FF8B00',
            questions: [],
            displayCreateQuestion: false,
        };
    }

    changeName(event: ChangeEvent<HTMLInputElement>) {
        this.setState({name: event.target.value});
    }

    changeDescription(event: ChangeEvent<HTMLInputElement>) {
        this.setState({description: event.target.value});
    }

    changeColor(color: string) {
        this.setState({color: color});
    }

    handleAddNewQuestion() {
        const {displayCreateQuestion} = this.state;
        this.setState({displayCreateQuestion: !displayCreateQuestion});
    }

    handleSaveNewQuestion(q: NewQuestion) {
        const {questions} = this.state;
        questions.push(q);
        this.setState({questions: questions, displayCreateQuestion: false});
    }

    handelSaveNewQuiz() {
        const {save} = this.props;
        const {name, description, color, questions} = this.state;

        save({name, description, color, questions});
    }

    isQuizValid(): boolean {
        const {name, description, color, questions} = this.state;

        return name.length > 0
            && description.length > 0
            && color.length > 0
            && questions.length > 0;
    }

    render() {
        const {isFetching} = this.props;
        const {name, description, questions, displayCreateQuestion} = this.state;

        return !isFetching ?
            <div id='create-quiz' className='container'>
                <div className='row justify-content-between align-items-center p-3'>
                    <h3 className='text-white'>New Quiz</h3>
                    <button
                        type='button'
                        className='btn btn-success'
                        style={{height: 40}}
                        disabled={!this.isQuizValid()}
                        onClick={this.handelSaveNewQuiz.bind(this)}
                    >
                        Save
                    </button>
                </div>

                <div className='container-fluid p-0'>
                    <div className='input-group mb-3'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>1</span>
                        </div>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Name'
                            aria-label='Quiz Name'
                            value={name}
                            onChange={this.changeName.bind(this)}
                        />
                    </div>

                    <div className='input-group mb-3'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>2</span>
                        </div>
                        <input
                            type='text'
                            className='form-control'
                            placeholder="Description"
                            aria-label="Quiz Description"
                            value={description}
                            onChange={this.changeDescription.bind(this)}
                        />
                    </div>

                    <ColorPicker onChange={this.changeColor.bind(this)} label='3' />

                    <div className='d-flex flex-column w-100'>
                        <div className='d-flex  align-items-center justify-content-between w-100 mb-1'>
                            <div className='d-flex align-items-center'>
                                <div
                                    className='rounded-circle bg-info d-flex align-items-center justify-content-center'
                                    style={{width: 40, height: 40}}
                                >
                                    {questions.length}
                                </div>
                                <span className='ml-2'>Questions</span>
                            </div>

                            {displayCreateQuestion ?
                                <IconButton
                                    onClick={this.handleAddNewQuestion.bind(this)}
                                >
                                    <img
                                        alt='Close new question'
                                        src={CloseSvg}
                                        style={{width: 40, height: 40}}
                                    />
                                </IconButton>
                                :
                                <IconButton
                                    onClick={this.handleAddNewQuestion.bind(this)}
                                >
                                    <img
                                        alt='Add new question'
                                        src={AddSvg}
                                        style={{width: 40, height: 40}}
                                    />
                                </IconButton>
                            }
                        </div>
                        {
                            displayCreateQuestion &&
                            <CreateQuestion
                              onClick={this.handleSaveNewQuestion.bind(this)}
                            />
                        }
                    </div>
                </div>
            </div>
            : <Spinner />;
    }
}

function mapStateToProps(state: AppState) {
    return {
        quiz: state.quizState.quiz,
        isFetching: state.quizState.isFetching,
        error: state.quizState.error,
    };
}

export default connect(mapStateToProps, {save})(CreateQuiz);
