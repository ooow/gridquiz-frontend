import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from "../pages/Main";

/** Main project routing configuration. */
class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Main} />,
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;
