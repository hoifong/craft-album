import React from 'react';
import Home from './views/home';
import './App.css';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import Reducer from './store';
import { Provider } from 'react-redux';
import ControllerLoading from './containers/Loading';
import Toast from './containers/Toast';

const store = createStore(Reducer, applyMiddleware(thunk, logger));

const App: React.FC = () => {
  return (
    <Provider store={store}>
        <div className="App">
          <ControllerLoading />
          <Toast />
          <Home />
        </div>
    </Provider>
  );
}

export default App;