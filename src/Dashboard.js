import React, {Component} from 'react';
import {connect} from 'react-redux';
import Carousel from 'nuka-carousel';

import Back from './img/back.svg';
import Pattern from './img/background_pattern.svg';

import {loadDashboard} from './actions/loaddashboard';
import DashboardResult from './DashboardResult';
import Link from 'react-router-dom/es/Link';
import FooterAbsolute from "./FooterAbsolute";

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.intervalId = setInterval(function () {
            window.location.reload();
        }, 180000);
    }

    showHead() {
        let headColor = `url(${Pattern}), linear-gradient(180deg, #DB3B4C 0%, #E6515E 100%)`;
        return (
            <div className='dashboard-header' style={{background: headColor}}>
                <Link to='/' className='link'>
                    <img className='back' src={Back} alt='back'/>
                </Link>
                <div className='quiz-title'>Quiz</div>
                <div className='quiz-author'>by Grid Dynamics</div>
                <div className='dashboard-results'>Results</div>
            </div>
        );
    }

    showSlides() {
        return (
            <Carousel autoplay={true} autoplayInterval={5000} wrapAround={true}>
                <div>
                    <DashboardResult result={this.props.dashboard[0]}/>
                </div>
                <div>
                    <DashboardResult result={this.props.dashboard[1]}/>
                </div>
                <div>
                    <DashboardResult result={this.props.dashboard[2]}/>
                </div>
            </Carousel>
        )
    }

    componentWillMount() {
        this.props.loadDashboard();
    }

    componentWillUnmount() {
        this.props.cleanDashboard();
        clearInterval(this.intervalId);
    }

    render() {
        return (
            <div className='page'>
                {this.showHead()}

                {this.props.dashboard && this.props.dashboard.length > 0 && this.showSlides()}

                <FooterAbsolute/>
            </div>
        );
    }
}

export default connect(
    state => ({
        dashboard: state.dashboard,
    }),
    dispatch => ({
        loadDashboard: () => {
            dispatch(loadDashboard());
        },
        cleanDashboard: () => {
            dispatch({type: 'CLEAN_DASHBOARD', payload: []});
        }
    })
)(Dashboard);
