import React from 'react';

import AsyncComponent from '../components/AsyncComponent';

import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

export default class RouteConfig extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Redirect from='/' to='/home' exact />
                    <Route path='/home' exact component={AsyncComponent(() => import('../views/Home/Home'))} />
                </Switch>
            </Router>
        );
    }
}
