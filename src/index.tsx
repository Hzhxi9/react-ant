import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';

import Route from './routes';

import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import './assets/styles/base.scss';

FastClick.attach(document.body);

ReactDOM.render(
    <React.StrictMode>
        <Route />
    </React.StrictMode>,
    document.getElementById('root')
);
