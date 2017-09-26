import React, {Component} from 'react';

import {css} from 'aphrodite';

import Logo from './img/logo.svg'
import Next from './img/next.svg'
import Pattern from './img/background_pattern.svg';


class HomeHead extends Component {
    render() {
        return (
            <div className='home-head-container'
                 style={{background: `url(${Pattern})` + ', linear-gradient(180deg, #DB3B4C 0%, #E6515E 100%)'}}>
                <img className='home-head-logo' src={Logo} alt='logo'/>
                <div className='home-head-welcome'>
                    Welcome to Grid Dynamics
                </div>

                <div className='home-head-quiz'>
                    Quiz
                </div>
                <div className='home-head-arrow'>
                    <img src={Next} alt='next'/>
                </div>
            </div>
        )
    }
}

export default HomeHead;