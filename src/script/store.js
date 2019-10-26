import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

const _PreloadedState = {}; // eslint-disable-line no-underscore-dangle
export default createStore(
  () => null,
  _PreloadedState,
  composeWithDevTools(applyMiddleware(logger))
);
