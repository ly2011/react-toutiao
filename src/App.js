import React from 'react';
import { Provider } from 'react-redux';

// import styles from './App.css';
import './styles/index.scss';
import Router from './router';
import store from './store';
const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default App;
