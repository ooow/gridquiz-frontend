import React, {Component} from 'react';
import {css} from 'aphrodite';
import styles from './styles/DashboardStyles';

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

    showResult() {
        return (
            <div className={css(styles.slideContainer)}>
                <div className={css(styles.slideTitleContainer)}>
                    <div className={css(styles.slideTitle)}>Results / {this.result.quizName}</div>
                </div>
                <div className={css(styles.slideBodyContainer)}>
                    {this.result.results.map((i, index) =>
                        this.showPlace(i, this.colors[index].a, this.colors[index].b)
                    )}
                </div>
            </div>
        )
    }

    showPlace(result, color1, color2) {
        let backgroundColor = 'linear-gradient(180deg, ' + color1 + ' 0%, ' + color2 + ' 100%';
        let backgroundColorPlace = 'linear-gradient(180deg, ' + color2 + ' 0%, ' + color1 + ' 100%';
        return (
            <div className={css(styles.slideSpaceContainer)} style={{background: backgroundColor}}>
                <div className={css(styles.place)} style={{background: backgroundColorPlace}}>
                    {result.position + 1}
                </div>
                <div className={css(styles.name)}>
                    {result.name}
                </div>
                <div className={css(styles.points)}>
                    {result.result}
                </div>
                <div className={css(styles.time)}>
                    {this.formatTime(result.time)}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.showResult()}
            </div>
        );
    }
}

export default DashboardResult;

