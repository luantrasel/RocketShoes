import { all } from 'redux-saga/effects';
import cart from './cart/sagas';

// function* é equivalente ao async
export default function* rootSaga() {
  // yield seria equivalente ao await
  return yield all([cart]);
}
