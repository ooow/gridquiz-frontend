import React, {Component} from 'react';

interface StopwatchProps {
    className?: string;
    start?: Date;
}

interface StopwatchState {
    secondsElapsed: number;
}

/**
 * A view component that displays stopwatch that does run from the start date.
 */
class Stopwatch extends Component<StopwatchProps, StopwatchState> {
    constructor(props: StopwatchProps) {
        super(props);

        this.state = {secondsElapsed: this.getStartDiffSec()};
    }

    // TODO: Fix problem with clearing the interval.
    private incrementer?: NodeJS.Timeout;

    componentDidMount() {
        this.start();
    }

    componentWillUnmount() {
        clearInterval(this.incrementer!);
    }

    private getStartDiffSec() {
        const {start} = this.props;
        if (!start) {
            return 0;
        }

        const timeBetween = Math.abs(new Date().getTime() - start.getTime());
        return Math.round(timeBetween / 1000);
    }

    private start() {
        this.incrementer = setInterval(() => {
            this.setState({secondsElapsed: (this.state.secondsElapsed + 1)});
        }, 1000);
    }

    /** Formats seconds to human readable label.
     *  Example: 100 -> 1:40
     */
    private format(seconds: number): string {
        return `${Math.floor(seconds / 60)}:${('0' + seconds % 60).slice(
            -2)}`;
    }

    render() {
        const {className} = this.props;
        const {secondsElapsed} = this.state;

        return <div className={className}>{this.format(secondsElapsed)}</div>;
    }
}

export default Stopwatch;
