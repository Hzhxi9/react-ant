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
                    <Route path='/mine' exact component={AsyncComponent(() => import('../views/Mine/Mine'))} />
                    <Route path='/login' exact component={AsyncComponent(() => import('../views/Login/Login'))} />
                    <Route path='/center' exact component={AsyncComponent(() => import('../views/Center/Center'))} />
                    <Route path='/shop' component={AsyncComponent(() => import('../views/Shop/Shop'))} />
                </Switch>
            </Router>
        );
    }
}
