import { createStore } from 'redux';

import rootReducer from './modules/combineReducers';

const store = createStore(rootReducer);

export default store;
