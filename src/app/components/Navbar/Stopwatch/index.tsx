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
    static defaultProps: StopwatchProps = {
        className: 'text-white',
    };

    constructor(props: StopwatchProps) {
        super(props);

        this.state = {secondsElapsed: this.getStartDiffSec()};
    }

    private incrementer?: NodeJS.Timeout;

    componentDidMount() {
        this.incrementer = setInterval(() => {
            this.setState({secondsElapsed: (this.state.secondsElapsed + 1)});
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.incrementer!);
    }

    private getStartDiffSec() {
        const {start} = this.props;
        if (!start) {
            return 0;
        }
        return secBetween(new Date(), start);
    }

    render() {
        const {className} = this.props;
        const {secondsElapsed} = this.state;

        return (
            <div className={className} style={{fontSize: 36}}>
                {format(secondsElapsed)}
            </div>
        );
    }
}

export default Stopwatch;

/**
 * Formats seconds to human readable label.
 * Example: 100 -> 1:40
 */
export function format(seconds: number): string {
    // TODO: Check case with more that an hour.
    return `${Math.floor(seconds / 60)}:${('0' + seconds % 60).slice(
        -2)}`;
}

/**
 * Returns second between two dates.
 */
export function secBetween(start: Date, end: Date): number {
    const timeBetween = Math.abs(end.getTime() - start.getTime());
    return Math.round(timeBetween / 1000);
}
