import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
import CartItem from '../../models/cart-item';
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;

      let cartItem;

      if (state.items[addedProduct.id]) {
        cartItem = new CartItem(state.items[addedProduct.id].quantity + 1, productPrice, productTitle, state.items[addedProduct.id].totalAmount + productPrice);
      } else {
        cartItem = new CartItem(1, productPrice, productTitle, productPrice)
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: cartItem },
        totalAmount: state.totalAmount + productPrice
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.productId];
      const currentQuantity = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQuantity > 1) {
        const updatedCartItem = new CartItem(selectedCartItem.quantity - 1, selectedCartItem.productPrice, selectedCartItem.productTitle, selectedCartItem.totalAmount - selectedCartItem.productPrice)
        updatedCartItems = { ...state.items, [action.productId]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.productId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      const item = state.items[action.productId];
      if (!item) {
        return state;
      }
      const updatedItems = {...state.items};
      const itemTotalAmount = item.totalAmount;
      delete updatedItems[action.productId]
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotalAmount
      };
  }
  return state;
};
