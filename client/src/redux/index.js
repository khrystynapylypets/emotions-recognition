import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = {};

export default createStore(
  combineReducers(rootReducer),
  composeWithDevTools(applyMiddleware(thunk))
);
