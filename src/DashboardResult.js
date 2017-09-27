import React, {Component} from 'react';

import Pattern from './img/background_pattern.svg';

class DashboardResult extends Component {

    constructor(props) {
        super(props);
        this.colors = [
            {
                a: '#F9D56D',
                b: '#C7A75D'
            },

            {
                a: '#D3D3D3',
                b: '#818181'
            },

            {
                a: '#BEA393',
                b: '#897167'
            },

            {
                a: '#DEDEDE',
                b: '#DEDEDE'
            },

            {
                a: '#DEDEDE',
                b: '#DEDEDE'
            }
        ];
        this.result = props.result;
    }

    formatTime(timerResult) {
        return Math.floor(timerResult / 60000) + ':' + ('0' + Math.floor(timerResult / 1000) % 60).slice(-2);
    }

    showPlace(result, color1, color2) {
        let backgroundColor = `linear-gradient(180deg, ${color1} 0%, ${color2} 100%`;
        let backgroundColorPlace = `linear-gradient(180deg, ${color2} 0%, ${color1} 100%`;
        return (
            <div key={result.position} className='slide-space-container' style={{background: backgroundColor}}>
                <div className='place' style={{background: backgroundColorPlace}}>
                    {parseInt(result.position, 10) + 1}
                </div>
                <div className='name'>
                    {result.name}
                </div>
                <div className='points'>
                    {result.result}
                </div>
                <div className='time'>
                    {this.formatTime(result.time)}
                </div>
            </div>
        )
    }

    render() {
        let bodyColor = `url(${Pattern}), linear-gradient(180deg, #508721 0%, #175A0A 100%)`;

        return (
            <div className='dashboard-container' style={{background: bodyColor}}>
                <div className='slide-title'>{this.result.quizName}</div>
                <div className='slide-body-container'>
                    {this.result.results.map((i, index) =>
                        this.showPlace(i, this.colors[index].a, this.colors[index].b)
                    )}
                </div>
            </div>
        )
    }
}

export default DashboardResult;

