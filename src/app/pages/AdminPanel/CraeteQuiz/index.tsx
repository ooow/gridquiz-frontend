import React, {ChangeEvent, Component, CSSProperties} from 'react';
import {ColorResult, RGBColor, SketchPicker} from 'react-color';
import hexRgb, {RgbaObject} from 'hex-rgb';
import {IconButton} from '@material-ui/core';
import AddSvg from '../../../assets/img/add.svg';
import CloseSvg from '../../../assets/img/close.svg';
import CreateQuestion from './CreateQuestion';
import {NewQuestion} from '../../../model/Question';
import {AppState} from '../../../redux/reducers';
import {connect} from 'react-redux';
import {save} from '../../../redux/quiz/thunk';
import Quiz from '../../../model/Quiz';
import './style.scss';
import Spinner from '../../../components/Spinner';

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
    colorRgb: RGBColor;
    displayColorPicker: boolean;
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
            colorRgb: {r: 255, g: 139, b: 0, a: 1},
            displayColorPicker: false,
            displayCreateQuestion: false,
        };
    }

    changeName(event: ChangeEvent<HTMLInputElement>) {
        this.setState({name: event.target.value});
    }

    changeDescription(event: ChangeEvent<HTMLInputElement>) {
        this.setState({description: event.target.value});
    }

    changeColor(color: ColorResult) {
        this.setState({colorRgb: color.rgb, color: color.hex});
    }

    changeColorHex(event: ChangeEvent<HTMLInputElement>) {
        try {
            const rgba: RgbaObject = hexRgb(event.target.value);
            const rgb: RGBColor = {
                r: rgba.red,
                g: rgba.green,
                b: rgba.blue,
                a: rgba.alpha,
            };
            this.setState({colorRgb: rgb});
        } catch (e) {
            // Do nothing.
        }
        this.setState({color: event.target.value});
    }

    handleCloseColorPicker() {
        this.setState({displayColorPicker: false});
    };

    handleClickColorPicker() {
        this.setState({displayColorPicker: !this.state.displayColorPicker});
    };

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

    renderColorPicker() {
        const {colorRgb, displayColorPicker, color} = this.state;

        const pickerStyle: CSSProperties = {
            background: `rgba(${this.state.colorRgb.r}, 
                              ${this.state.colorRgb.g}, 
                              ${this.state.colorRgb.b}, 
                              ${this.state.colorRgb.a})`,
        };

        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">3</span>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Color"
                    aria-label="Quiz color"
                    maxLength={7}
                    value={color}
                    onChange={this.changeColorHex.bind(this)}
                />
                <div className="input-group-append">
                    <button
                        type="button"
                        className="btn color-picker-button"
                        style={pickerStyle}
                        onClick={this.handleClickColorPicker.bind(this)}
                    > Pick Color
                    </button>
                </div>
                {
                    displayColorPicker &&
                    <div className='color-picker-container'>
                        <div
                          className='color-picker'
                          onClick={this.handleCloseColorPicker.bind(this)}
                        />
                        <SketchPicker
                          color={colorRgb} onChange={this.changeColor.bind(this)}
                        />
                    </div>
                }
            </div>
        );
    }

    render() {
        const {isFetching} = this.props;
        const {name, description, questions, displayCreateQuestion} = this.state;

        return !isFetching ?
            <div id='create-quiz' className='container'>
                <div className='row mt-2 justify-content-between align-items-center'>
                    <p className='new-quiz-title'>New Quiz</p>
                    <button
                        type="button"
                        className="btn btn-success"
                        style={{height: 40}}
                        disabled={!this.isQuizValid()}
                        onClick={this.handelSaveNewQuiz.bind(this)}
                    >
                        Save
                    </button>
                </div>

                <div className='row justify-content-between'>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">1</span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            aria-label="Quiz Name"
                            value={name}
                            onChange={this.changeName.bind(this)}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">2</span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Description"
                            aria-label="Quiz Description"
                            value={description}
                            onChange={this.changeDescription.bind(this)}
                        />
                    </div>

                    {this.renderColorPicker()}

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
