import "./index.css"
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {BrowserRouter, Route} from 'react-router-dom';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from "./reducers"

import App from './App'
import Quiz from "./Quiz";
import Dashboard from "./Dashboard";
import AdminPanel from "./admin/AdminPanel";


import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
const user = localStorage.getItem('user');

ReactDOM.render((
        <Provider store={store}>
            <BrowserRouter>
                <div className="page">
                    <Route exact path="/" component={App}/>
                    <Route path="/quiz/:id/question/:qid" component={Quiz}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/admin/panel" component={AdminPanel}/>
                </div>
            </BrowserRouter>
        </Provider>),
    document.getElementById('page')
);

registerServiceWorker();
