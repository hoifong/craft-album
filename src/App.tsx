import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './views/home';
import Login from './views/login';
import './App.css';
import Register from './views/register';
import { createStore } from 'redux';
import Reducer from './store';
import { Provider } from 'react-redux';

const store = createStore(Reducer);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Route path='/' exact component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
