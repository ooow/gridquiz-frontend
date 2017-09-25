import React, {Component} from 'react';
import {connect} from 'react-redux';
import {css} from 'aphrodite';
import styles from './styles/DashboardStyles';
import Carousel from 'nuka-carousel';

import Back from './img/back.svg';
import Pattern from './img/background_pattern.svg';

import {loadDashboard} from './actions/loaddashboard';
import DashboardResult from './DashboardResult';
import Link from 'react-router-dom/es/Link';

class Dashboard extends Component {

    showHead() {
        let headColor = `url(${Pattern})` + ', linear-gradient(180deg, #DB3B4C 0%, #E6515E 100%)';
        return (
            <div className={css(styles.headContainer)} style={{background: headColor}}>
                <div className={css(styles.logoContainer)}>
                    <Link to='/'>
                        <img src={Back} alt='back'/>
                    </Link>
                </div>
                <div className={css(styles.quizTitleContainer)}>
                    <div className={css(styles.quizTitle)}>Quiz</div>
                </div>
                <div className={css(styles.quizName)}>Grid Dynamics</div>
                <div className={css(styles.space)}/>
            </div>
        );
    }

    showSlides() {
        let bodyColor = `url(${Pattern})` + ', linear-gradient(180deg, #508721 0%, #175A0A 100%)';

        return (
            <div className={css(styles.bodyContainer)} style={{background: bodyColor}}>
                <Carousel autoplay={true} autoplayInterval={5000} wrapAround={true} frameOverflow='visible'>
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
            </div>
        )
    }

    componentWillMount() {
        this.props.loadDashboard();
    }

    componentWillUnmount() {
        this.props.cleanDashboard();
    }

    render() {
        return (
            <div className='page'>
                {this.showHead()}

                {this.props.dashboard && this.props.dashboard.length > 0 && this.showSlides()}
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
