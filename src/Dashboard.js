import React, {Component} from 'react';
import {connect} from 'react-redux';
import {css} from 'aphrodite';
import styles from "./styles/DashboardStyles";

import Back from "./img/back.svg";
import Pattern from "./img/background_pattern.svg";

import {loadDashboard} from "./actions/loaddashboard";

class Dashboard extends Component {

    constructor(props) {
        super(props);

        /* ["showRegistration", "authUser", "showRegForm", "logout"].forEach((method) => {
             this[method] = this[method].bind(this);
         });

         this.state = {
             showRegistration: false,
             quizzes: [],
             user: JSON.parse(localStorage.getItem('user'))
         };

         if (this.state.user !== null) {
             this.props.checkAuth(this.state.user);
         }*/
    }


    showHead() {
        let headColor = `url(${Pattern})` + ', linear-gradient(180deg, #DB3B4C 0%, #E6515E 100%)';
        return (
            <div className={css(styles.headContainer)} style={{background: headColor}}>
                <div className={css(styles.logoContainer)}>
                    <img src={Back} alt="back"/>
                </div>
                <div className={css(styles.quizTitleContainer)}>
                    <div className={css(styles.quizTitle)}>Quiz</div>
                </div>
                <div className={css(styles.quizName)}>Grid Dynamics</div>
                <div className={css(styles.space)}/>
            </div>
        );
    }

    showDashboard() {
        let bodyColor = `url(${Pattern})` + ', linear-gradient(180deg, #508721 0%, #175A0A 100%)';
        return (
            <div className={css(styles.bodyContainer)} style={{background: bodyColor}}>
                <div>{this.props.dashboard.results}</div>
            </div>
        )
    }

    componentWillMount() {
        this.props.loadDashboard();
    }

    render() {
        return (
            <div className=" page">
                {this.showHead()}
                {this.props.dashboard && this.showDashboard()}
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
        }
    })
)(Dashboard);
