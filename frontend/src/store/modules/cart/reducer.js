import produce from 'immer';

export default function cart(state = [], action) {
  if (action.type === '@cart/ADD_SUCCESS') {
    return produce(state, (draft) => {
      const { product } = action;
      draft.push(product);
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

  if (action.type === '@cart/UPDATE_AMOUNT_SUCCESS') {
    return produce(state, (draft) => {
      const productIndex = draft.findIndex((p) => p.id === action.id);

      if (productIndex >= 0) {
        draft[productIndex].amount = Number(action.amount);
      }
    });
  }

  return state;
}
