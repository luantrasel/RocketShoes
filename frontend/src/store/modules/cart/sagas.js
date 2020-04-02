import { call, put, all, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';

import { addToCartSuccess } from './actions';

// function* é equivalente ao async
function* addToCart({ id }) {
  // yield seria equivalente ao await
  const response = yield call(api.get, `products/${id}`);

  yield put(addToCartSuccess(response.data));
}

export default all([
  // usando o takeLatest, caso a ação seja disparada, enquanto a útlima ainda
  // nao tenha sido completada, vai valer apenas a ultima ação
  // evita problemas com múltiplos cliques na hora de comprar, por exemplo...
  takeLatest('@cart/ADD_REQUEST', addToCart),
]);
