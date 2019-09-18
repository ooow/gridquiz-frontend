import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from '../pages/Main';
import QuizView from '../pages/Quiz';
import NotFound from '../pages/NotFound';

/** Main project routing configuration. */
class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Main} />,
                    <Route exact path='/quiz/:id' component={QuizView} />,
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;
