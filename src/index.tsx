import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/scss/bootstrap.scss';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import Router from "./app/router";

/** The GridQuiz App. */
class GridQuiz extends Component {
    render() {
        return (<Router />);
    }
}

ReactDOM.render(<GridQuiz />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
