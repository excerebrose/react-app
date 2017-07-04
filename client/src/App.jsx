import React from 'react';
import Routes from './Routes';
import { ConnectedRouter } from 'connected-react-router'

import './App.css';

const App = ({ history }) => {
    return (
      <ConnectedRouter className='app' history={history}>
        <Routes />
      </ConnectedRouter>
    );
}
export default App;
