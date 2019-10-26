import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';

import 'StyleSheets/index.scss';
import store from 'Scripts/store.js';

import App from 'Scripts/app.jsx';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
