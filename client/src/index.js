import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';

import App from './App';
import rootReducer from './reducers';

import registerServiceWorker from './registerServiceWorker';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const history = createBrowserHistory()
const store = createStore(
  connectRouter(history)(rootReducer),
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history),
    ),
  ),
)
ReactDOM.render(
    <Provider store={store}>
        <App history={history} />
    </Provider>
    ,document.getElementById('root')
);
registerServiceWorker();
