import produce from 'immer';

export default function cart(state = [], action) {
  if (action.type === '@cart/ADD') {
    return produce(state, (draft) => {
      const productIndex = draft.findIndex((p) => p.id === action.product.id);

      if (productIndex >= 0) {
        draft[productIndex].amount += 1;
      } else {
        draft.push({
          ...action.product,
          amount: 1,
        });
      }
    });
  }

  if (action.type === '@cart/REMOVE') {
    return produce(state, (draft) => {
      const productIndex = draft.findIndex((p) => p.id === action.id);

      if (productIndex >= 0) {
        draft.splice(productIndex, 1);
      }
    });
  }

  if (action.type === '@cart/UPDATE_AMOUNT') {
    if (action.amount <= 0) {
      return state;
    }

    return produce(state, (draft) => {
      const productIndex = draft.findIndex((p) => p.id === action.id);

      if (productIndex >= 0) {
        draft[productIndex].amount = Number(action.amount);
      }
    });
  }

  return state;
}
