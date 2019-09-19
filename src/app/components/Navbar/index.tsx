import React, {Component, ReactNode} from 'react';
import Logo from '../Logo';
import './style.scss';

export const SafeEmptyRender = '';

interface NavbarProps {
    children?: ReactNode,
}

class Navbar extends Component<NavbarProps> {
    render() {
        const {children} = this.props;

        return (
            <div id='navbar' className='container pt-3'>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-start'>
                        <Logo className='navbar-logo' />
                        <div className='d-flex flex-column ml-2'>
                            <h1 className='navbar-title'>Quiz</h1>
                            <p className='navbar-subtitle'>
                                by Grid Dynamics
                            </p>
                        </div>
                    </div>
                    <div className='d-flex'>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;
