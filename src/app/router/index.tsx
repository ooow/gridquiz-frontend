import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from '../pages/Main';
import QuizView from '../pages/Quiz';
import NotFound from '../pages/NotFound';
import AdminPanel from '../pages/AdminPanel';

export const ADMIN_PAGE_URL = '/wcxwneqwuw/admin';

/** Main project routing configuration. */
class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Main} />,
                    <Route exact path='/quiz/:id' component={QuizView} />,
                    <Route exact path={ADMIN_PAGE_URL} component={AdminPanel} />,
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;
