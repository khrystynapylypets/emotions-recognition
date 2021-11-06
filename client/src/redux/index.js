import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { authReducer } from './reducers/auth';
import { galleryReducer } from './reducers/gallery';

const rootReducer = {
  auth: authReducer,
  gallery: galleryReducer,
};

const store = createStore(
  combineReducers(rootReducer),
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
