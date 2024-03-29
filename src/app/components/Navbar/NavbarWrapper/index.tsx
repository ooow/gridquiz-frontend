import React, {Component, ReactNode} from 'react';
import ArrowSvg from '../../../assets/img/arrow.svg';
import Logo from '../../Logo';
import Navbar from '../index';
import {IconButton} from '@material-ui/core';
import './style.scss';

interface NavbarWrapperProps {
    children?: ReactNode,
}

interface NavbarWrapperState {
    collapsed: boolean,
}

class NavbarWrapper extends Component<NavbarWrapperProps, NavbarWrapperState> {
    constructor(props: NavbarWrapperProps) {
        super(props);

        this.state = {collapsed: false};
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll.bind(this));
    }

    onScroll() {
        const {collapsed} = this.state;

        if (!collapsed) {
            // User can view full nav bar only once.
            this.setState({collapsed: window.scrollY !== 0});
        }
    }

    handleArrow() {
        window.scrollTo(0, 1);
    }

    render() {
        const {children} = this.props;
        const {collapsed} = this.state;

        let className = 'header';
        if (collapsed) {
            className += ' coll';
        }
        return (
            <div id='navbar-full'>
                <div className={className}>
                    <div>
                        {collapsed && <Navbar>{children}</Navbar>}
                    </div>
                    <div className='container-fluid p-2 p-sm-5 h-100 full'>
                        <div className='row justify-content-center mt-5'>
                            <Logo className='logo' />
                        </div>
                        <div className='row justify-content-center mt-5'>
                            <h1 className='welcome-text'>
                                Welcome to Grid Dynamics
                            </h1>
                        </div>
                        <div className='row justify-content-center'>
                            <h1 className='title'>
                                Quiz
                            </h1>
                        </div>
                        <div className='row justify-content-center mt-5 arrow'>
                            <IconButton
                                onClick={this.handleArrow}
                                style={{height: 72}}
                            >
                                <img alt='arrow' src={ArrowSvg} />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavbarWrapper;
