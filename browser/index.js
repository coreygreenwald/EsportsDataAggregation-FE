import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import store from './store'
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('app')
);