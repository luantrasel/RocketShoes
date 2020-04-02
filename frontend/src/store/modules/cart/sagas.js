import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatPrice } from '../../../util/format';
import api from '../../../services/api';

import { addToCartSuccess, updateAmountSuccess } from './actions';

// function* é equivalente ao async
function* addToCart({ id }) {
  // yield seria equivalente ao await
  const response = yield call(api.get, `/products/${id}`);
  const productExists = yield select((state) =>
    state.cart.find((p) => p.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Produto sem estoque suficiente');
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Produto sem estoque suficiente');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  // usando o takeLatest, caso a ação seja disparada, enquanto a útlima ainda
  // nao tenha sido completada, vai valer apenas a ultima ação
  // evita problemas com múltiplos cliques na hora de comprar, por exemplo...
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
