import "./index.css"
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {Route, Router} from 'react-router-dom';
import {composeWithDevTools} from 'redux-devtools-extension';
import createBrowserHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk';
import reducer from "./reducers"

import App from './App'
import Quiz from "./Quiz";
import Dashboard from "./Dashboard";
import AdminPanel from "./AdminPanel";


import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
const history = createBrowserHistory();

ReactDOM.render((
        <Provider store={store}>
            <Router history={history}>
                <div className="page">
                    <Route exact path="/" component={App}/>
                    <Route path="/quiz/:id/question/:qid" component={Quiz}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/admin/panel" component={AdminPanel}/>
                </div>
            </Router>
        </Provider>),
    document.getElementById('page')
);

registerServiceWorker();
