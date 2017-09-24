import React, {Component} from 'react';

import {css} from 'aphrodite';

import Logo from './img/logo.svg'
import Next from './img/next.svg'
import Back from "./img/back.svg";
import styles from "./styles/HomeHeadStyles";


class HomeHead extends Component {
    render() {
        return (
            <div className={css(styles.homeHeadContainer)}
                 style={{background: `url(${Back})` + ', linear-gradient(180deg, #DB3B4C 0%, #E6515E 100%)'}}>
                <div className={css(styles.space)}/>
                <div className={css(styles.mainLogoContainer)}>
                    <img className={css(styles.logo)} src={Logo} alt="logo"/>
                    <div className={css(styles.companyTitle)}>
                        Welcome to Grid Dynamics
                    </div>

                    <div className={css(styles.quizTitle)}>
                        Quiz
                    </div>
                </div>
                <div className={css(styles.nextArrowContainer)}>
                    <img src={Next} alt="next"/>
                </div>
            </div>
        )
    }
}

export default HomeHead;