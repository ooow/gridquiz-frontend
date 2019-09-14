import React, {Component} from 'react';
import LogoSvg from './../../assets/img/logo.svg'
import ArrowSvg from './../../assets/img/arrow.svg'
import LoginButton from "../../components/LoginButton";
import './main.scss';

class Main extends Component {
    render() {
        return (
            <div>
                <div className='main-background-primary h-100vh'>
                    <div className='container-fluid p-5 h-100'>
                        <div className='row justify-content-end'>
                            <LoginButton />
                        </div>
                        <div className='row justify-content-center mt-5'>
                            <img alt='logo' src={LogoSvg} />
                        </div>
                        <div className='row justify-content-center mt-2'>
                            <h1 className='text-white'>
                                Welcome to Grid Dynamics
                            </h1>
                        </div>
                        <div className='row justify-content-center my-5'>
                            <h1 className='main-title'>
                                Quiz
                            </h1>
                        </div>
                        <div className='row justify-content-center h-50 mt-5'>
                            <img alt='arrow' src={ArrowSvg} />
                        </div>
                    </div>
                </div>
                <div className='main-background-accent h-100vh'>

                </div>
            </div>
        );
    }
}

export default Main;
