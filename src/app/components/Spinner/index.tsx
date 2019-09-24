import React, {Component} from 'react';

interface SpinnerProps {
    className?: string;
}

/** A view component which displays loading spinner. */
class Spinner extends Component<SpinnerProps> {
    static defaultProps: SpinnerProps = {
        className: 'row justify-content-center',
    };

    render() {
        const {className} = this.props;
        return (
            <div className={className}>
                <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
}

export default Spinner;
