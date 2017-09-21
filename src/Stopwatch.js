import React, {Component} from 'react';
import {connect} from 'react-redux';

class Stopwatch extends Component {
    constructor(props) {
        super(props);

        ["start", "stop", "getSeconds", "getMinutes"].forEach((method) => {
            this[method] = this[method].bind(this);
        });

        this.state = {
            secondsElapsed: 0
        };
    }

    getSeconds() {
        return ('0' + this.state.secondsElapsed % 60).slice(-2);
    }

    getMinutes() {
        return Math.floor(this.state.secondsElapsed / 60);
    }

    start() {
        this.incrementer = setInterval(() => {
            this.setState({secondsElapsed: (this.state.secondsElapsed + 1)});
        }, 1000)
    }

    stop() {
        clearInterval(this.incrementer);
    }

    componentWillMount() {
        this.start();
        this.props.startWatch(Date.now());
    }

    componentWillUnmount() {
        this.stop();
        this.props.stopWatch(Date.now());
    }

    render() {
        if (!this.props.stopwatch.run) {
            this.stop();
        }
        return <div>{this.getMinutes()}:{this.getSeconds()}</div>
    }
}

export default connect(
    state => ({
        stopwatch: state.stopwatch
    }),
    dispatch => ({
        startWatch: (date) => {
            dispatch({type: 'START_WATCH', payload: date});
        },
        stopWatch: (date) => {
            dispatch({type: 'STOP_WATCH', payload: date});
        },
    }))(Stopwatch);