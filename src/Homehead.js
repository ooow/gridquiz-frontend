import React, {Component} from 'react';

import Logo from './img/logo.svg'
import Next from './img/next.svg'

class HomeHead extends Component {
    render() {
        return (
            <div className="container">
                <div className="bar">
                    <div className="flex-box-column">
                        <img className="logo" src={Logo}/>
                        <div className="flex-box-column">
                            <div className="company-title">
                                Welcome to Grid Dynamics
                            </div>

                            <div className="quiz-title">
                                <h1>Quiz</h1>
                            </div>
                        </div>
                    </div>
                    <img className="next" src={Next}/>
                </div>
            </div>
        )
    }
}

export default HomeHead;