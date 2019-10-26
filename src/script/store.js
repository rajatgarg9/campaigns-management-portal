import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import { siteDetails } from 'Scripts/actionReducers/siteDetails/siteDetailsReducers.js';

const _PreloadedState = {}; // eslint-disable-line no-underscore-dangle
export default createStore(
  combineReducers({ siteDetails }),
  _PreloadedState,
  composeWithDevTools(applyMiddleware(logger))
);
