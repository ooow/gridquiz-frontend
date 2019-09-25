import React, {ChangeEvent, Component, CSSProperties} from 'react';
import {ColorResult, RGBColor, SketchPicker} from 'react-color';
import hexRgb, {RgbaObject} from 'hex-rgb';
import './style.scss';

interface ColorPickerProps {
    label?: string;
    onChange: (color: string) => void;
}

interface ColorPickerState {
    color: string;
    colorRgb: RGBColor;
    displayColorPicker: boolean;
}

class ColorPicker extends Component<ColorPickerProps, ColorPickerState> {
    constructor(props: ColorPickerProps) {
        super(props);

        this.state = {
            color: '#FF8B00',
            colorRgb: {r: 255, g: 139, b: 0, a: 1},
            displayColorPicker: false,
        };
    }

    async changeColor(color: ColorResult) {
        await this.setState({colorRgb: color.rgb, color: color.hex});
        this.updateState();
    }

    async changeColorHex(event: ChangeEvent<HTMLInputElement>) {
        try {
            const rgba: RgbaObject = hexRgb(event.target.value);
            const rgb: RGBColor = {
                r: rgba.red,
                g: rgba.green,
                b: rgba.blue,
                a: rgba.alpha,
            };
            await this.setState({colorRgb: rgb});
        } catch (e) {
            // Do nothing.
        }
        await this.setState({color: event.target.value});
        this.updateState();
    }

    updateState() {
        const {onChange} = this.props;
        const {color} = this.state;
        onChange(color);
    }

    handleCloseColorPicker() {
        this.setState({displayColorPicker: false});
    };

    handleClickColorPicker() {
        this.setState({displayColorPicker: !this.state.displayColorPicker});
    };

    render() {
        const {label} = this.props;
        const {colorRgb, displayColorPicker, color} = this.state;

        const pickerStyle: CSSProperties = {
            background: `rgba(${this.state.colorRgb.r}, 
                              ${this.state.colorRgb.g}, 
                              ${this.state.colorRgb.b}, 
                              ${this.state.colorRgb.a})`,
        };

        return (
            <div id='color-picker' className='input-group mb-3'>
                {
                    label &&
                    <div className='input-group-prepend'>
                        <span className='input-group-text'>{label}</span>
                    </div>
                }
                <input
                    type='text'
                    className='form-control'
                    placeholder='Color'
                    aria-label='Quiz color'
                    maxLength={7}
                    value={color}
                    onChange={this.changeColorHex.bind(this)}
                />
                <div className='input-group-append'>
                    <button
                        type='button'
                        className='btn color-picker-button'
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
}

export default ColorPicker;
