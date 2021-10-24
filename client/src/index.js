/* Application entry point.
 * Import the store.
 * Render react application to DOM.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux';
import routes from './routes';
import './style.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {routes}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
