import React, {Component} from 'react';
import LogoSVG from './../../assets/img/logo.svg';

interface LogoProps {
    className?: string;
    onClick?: void;
}

/** A view component which displays the project logotype. */
class Logo extends Component<LogoProps> {
    static defaultProps = {
        className: 'wh-2em',
    };

    render() {
        const {className} = this.props;
        return <img
            alt='Grid Quiz Logotype'
            className={className} src={LogoSVG}
        />;
    }
}

export default Logo;
