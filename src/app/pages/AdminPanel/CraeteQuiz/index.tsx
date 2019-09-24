import React, {ChangeEvent, Component, CSSProperties} from 'react';
import {ColorResult, RGBColor, SketchPicker} from 'react-color';
import hexRgb, {RgbaObject} from 'hex-rgb';
import {IconButton} from '@material-ui/core';
import AddSvg from '../../../assets/img/add.svg';
import CreateQuestion from './CreateQuestion';
import {NewQuestion} from '../../../model/Question';
import './style.scss';

interface CreateQuizProps {
}

interface CreateQuizState {
    name: string;
    description: string;
    color: RGBColor;
    colorHex: string;
    displayColorPicker: boolean;
}

class CreateQuiz extends Component<CreateQuizProps, CreateQuizState> {
    constructor(props: CreateQuizProps) {
        super(props);

        this.state = {
            name: '',
            description: '',
            colorHex: '#FF8B00',
            color: {r: 255, g: 139, b: 0, a: 1},
            displayColorPicker: false,
        };
    }

    changeName(event: ChangeEvent<HTMLInputElement>) {
        this.setState({name: event.target.value});
    }

    changeDescription(event: ChangeEvent<HTMLInputElement>) {
        this.setState({description: event.target.value});
    }

    changeColor(color: ColorResult) {
        this.setState({color: color.rgb, colorHex: color.hex});
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
            this.setState({color: rgb});
        } catch (e) {
            // Do nothing.
        }
        this.setState({colorHex: event.target.value});
    }

    handleCloseColorPicker() {
        this.setState({displayColorPicker: false});
    };

    handleClickColorPicker() {
        this.setState({displayColorPicker: !this.state.displayColorPicker});
    };

    handleAddNewQuestion(q: NewQuestion) {
        console.log(1, q);
    }

    renderColorPicker() {
        const {color, displayColorPicker, colorHex} = this.state;

        const pickerStyle: CSSProperties = {
            background: `rgba(${this.state.color.r}, 
                              ${this.state.color.g}, 
                              ${this.state.color.b}, 
                              ${this.state.color.a})`,
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
                    value={colorHex}
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
                          color={color} onChange={this.changeColor.bind(this)}
                        />
                    </div>
                }
            </div>
        );
    }

    render() {
        const {name, description} = this.state;

        return (
            <div id='create-quiz' className='container'>
                <div className='row mt-2'>
                    <p className='new-quiz-title'>New Quiz</p>
                </div>

                <div className='row justify-content-between'>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                1
                            </span>
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
                            <span className="input-group-text">
                                2
                            </span>
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

                    <IconButton
                        className='add-new-question'
                    >
                        <img
                            alt='Add new question'
                            src={AddSvg}
                        />
                    </IconButton>

                    <CreateQuestion onClick={this.handleAddNewQuestion.bind(this)} />
                </div>
            </div>
        );
    }
}

export default CreateQuiz;
