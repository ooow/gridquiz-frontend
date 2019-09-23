import React, {Component, CSSProperties} from 'react';
import './style.scss';

interface OptionButtonProp {
    index: number;
    indexColor: string;
    text: string;
    onClick?: any;
}

class OptionButton extends Component<OptionButtonProp> {
    static defaultProps: OptionButtonProp = {
        index: 0,
        indexColor: 'white',
        text: 'None',
    };

    getFontSize(text: string) {
        switch (Math.trunc(text.length / 24)) {
            case 0:
                return 24;
            case 1:
                return 22;
            case 2:
                return 20;
            case 3:
                return 18;
            default:
                return 16;
        }
    }

    render() {
        const {index, indexColor, text, onClick} = this.props;
        const fontStyle: CSSProperties = {fontSize: this.getFontSize(text)};

        return (
            <div className='option card shadow cursor-pointer m-2 m-sm-4' onClick={onClick}>
                <div className='d-flex h-100'>
                    <div
                        className='option-index d-flex align-items-center justify-content-center'
                        style={{color: indexColor}}
                    >
                        {index}
                    </div>
                    <div
                        className='option-text d-flex flex-fill align-items-center justify-content-sm-center'
                        style={fontStyle}
                    >
                        {text}
                    </div>
                </div>
            </div>
        );
    }
}

export default OptionButton;
