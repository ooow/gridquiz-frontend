import "./index.css"
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {BrowserRouter, Route} from 'react-router-dom';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';


import App from './App'
import Quiz from "./Quiz";
import Result from "./Result";

import reducer from "./reducers"
import {loadQuizzes} from './actions/loadquizess'

import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
store.dispatch(loadQuizzes());

ReactDOM.render((
        <Provider store={store}>
            <BrowserRouter>
                <div className="page">
                    <Route exact path="/" component={App}/>
                    <Route path="/quiz/:id/question/:qid" component={Quiz}/>
                    <Route path="/quiz/:id/result" component={Result}/>
                </div>
            </BrowserRouter>
        </Provider>),
    document.getElementById('page')
);

registerServiceWorker();
