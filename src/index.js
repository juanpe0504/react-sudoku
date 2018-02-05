import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import storeApp from './store/index'
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={storeApp}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
