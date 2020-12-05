import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import Route from './routes';
import roorStore from './store';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { composeWithDevTools } from 'redux-devtools-extension';

import './assets/styles/base.scss';

FastClick.attach(document.body);

const store = createStore(roorStore, composeWithDevTools(applyMiddleware(logger, thunk)));

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <Route />
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);
