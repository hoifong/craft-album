import React from 'react';
import Home from './views/home';
import './App.css';
import store from './store';
import { Provider } from 'react-redux';
import ControllerLoading from './containers/Loading';
import Toast from './containers/Toast';



const App: React.FC = () => {
  return (
    <Provider store={store}>
        <div className="App">
          <ControllerLoading />
          {/* <Loading show={true}/> */}
          <Toast />
          <Home />
        </div>
    </Provider>
  );
}

export default App;
