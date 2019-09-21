import React, {Component, ReactNode} from 'react';
import Logo from '../Logo';
import {Link} from 'react-router-dom';
import './style.scss';

export const SafeEmptyRender = '';

interface NavbarProps {
    children?: ReactNode,
    activeLinkToHome?: boolean,
}

class Navbar extends Component<NavbarProps> {
    render() {
        const {children, activeLinkToHome} = this.props;

        return (
            <div id='navbar' className='container pt-3'>
                <div className='d-flex align-items-center justify-content-between'>
                    <Link
                        to={activeLinkToHome ? '/' : '#'}
                        className='d-flex align-items-start'
                    >
                        <Logo className='navbar-logo' />
                        <div className='d-flex flex-column ml-2'>
                            <h1 className='navbar-title'>Quiz</h1>
                            <p className='navbar-subtitle'>
                                by Grid Dynamics
                            </p>
                        </div>
                    </Link>
                    <div className='d-flex'>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;
