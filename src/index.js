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
import AdminPanel from "./admin/AdminPanel";

import reducer from "./reducers"
import {loadQuizzes} from './actions/loadquizess'

import registerServiceWorker from './registerServiceWorker';
import {authUser} from "./actions/authuser";


//localStorage.clear();

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
store.dispatch(loadQuizzes());
const user = localStorage.getItem('user');
if (user !== null) {
    store.dispatch(authUser(JSON.parse(user)));
}

ReactDOM.render((
        <Provider store={store}>
            <BrowserRouter>
                <div className="page">
                    <Route exact path="/" component={App}/>
                    <Route path="/quiz/:id/question/:qid" component={Quiz}/>
                    <Route path="/admin/panel" component={AdminPanel}/>
                </div>
            </BrowserRouter>
        </Provider>),
    document.getElementById('page')
);

registerServiceWorker();
