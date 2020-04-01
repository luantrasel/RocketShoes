export default function cart(state = [], action) {
  if (action.type === 'ADD_TO_CART') {
    return [...state, action.product];
  }

  return state;
}
