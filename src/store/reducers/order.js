import * as actionTypes from "./../actions/actionTypes";
// import { updateObject } from './../utility'

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.PURCHASE_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PURCHASE_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true,
      };
    case actionTypes.PURCHASE_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.ORDERS_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false,
      };
    case actionTypes.ORDERS_FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
