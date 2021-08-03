import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import axios from 'axios';
import stores from './stores';
import App from './components/App';

axios.defaults.baseURL = 'https://js-band-store-api.glitch.me';

ReactDOM.render(
  <Provider stores={stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
