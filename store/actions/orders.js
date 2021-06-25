export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";
import Order from "../../model/order";

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      //any async code you want

      const userId = getState().auth.userId;
      const response = await fetch(
        `https://rn-development-c72a9-default-rtdb.europe-west1.firebasedatabase.app/orders/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const resData = await response.json();
      const loadedOrders = [];
      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }
      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (err) {
      // send to custom analytic sever
      throw err;
    }
  };
};
export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const date = new Date();
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://rn-development-c72a9-default-rtdb.europe-west1.firebasedatabase.app/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );
    if (!response.ok) {
      throw new Error("something got wrong");
    }
    const restData = await response.json();
    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: restData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
