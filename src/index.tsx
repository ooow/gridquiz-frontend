import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/scss/bootstrap.scss';
import {Provider} from 'react-redux';
import Router from './app/router';
import store from './app/redux/store';
import * as serviceWorker from './serviceWorker';
import './index.scss';

/** The GridQuiz app. */
class GridQuiz extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router />
            </Provider>);
    }
}

ReactDOM.render(<GridQuiz />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
