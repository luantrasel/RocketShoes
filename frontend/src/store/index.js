import { createStore } from 'redux';

import rootReducer from './modules/combineReducers';

const enhancer =
  process.env.NODE_ENV === 'development' ? console.tron.createEnhancer() : null;

const store = createStore(rootReducer, enhancer);

export default store;
