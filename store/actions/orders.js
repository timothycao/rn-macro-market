import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(`https://macro-mkt.firebaseio.com/orders/${userId}.json`);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      const orders = [];

      for (const key in data) {
        orders.push(
          new Order(
            key, data[key].cartItems,
            data[key].totalAmount,
            new Date(data[key].date)
          )
        );
      }
      dispatch({ type: SET_ORDERS, orders: orders });
    } catch (error) {
      throw error;
    }
  };
}

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const response = await fetch(`https://macro-mkt.firebaseio.com/orders/${userId}.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date.toISOString()
      })
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const data = await response.json();

    dispatch({
      type: ADD_ORDER,
      order: {
        id: data.name,
        items: cartItems,
        amount: totalAmount,
        date: date
      }
    });
  };
};
