import React from 'react';
import { Route, browserHistory, IndexRoute } from 'react-router';
import App from './components/App';

export default (
    <Route path="/" history={browserHistory} component={App} >
        <IndexRoute path="*" component={App} unMatchedRoute={true} />
    </Route>
);