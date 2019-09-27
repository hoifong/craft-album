import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './views/home';
import Login from './views/login';
import './App.css';
import Register from './views/register';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Route path='/' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Router>
    </div>
  );
}

export default App;
