import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
//import configureStore from './store/configureStore';
import App from './components/App';
require('./favicon.ico'); // Tell webpack to load favicon.ico

import './assets/styles/styles.scss';

//const store = configureStore();

ReactDOM.render((
    <BrowserRouter>
        <Route path="/" component={App} />
    </BrowserRouter>
),
    document.getElementById('app')
);