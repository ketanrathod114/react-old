import * as actionTypes from './actionTypes';
import axios from '../../axios-order'

export const purchaseSuccess = (id, orderData) =>{
    return{
        type: actionTypes.PURCHASE_SUCCESS,
        orderid: id,
        orderData: orderData
    }
}

export const purchaseFailure = (error) => {
    return {
        type: actionTypes.PURCHASE_FAILURE,
        error: error
    }
}

export const purchaseStart = () => {
    return {
        type: actionTypes.PURCHASE_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseStart());
        axios
      .post("/orders.json", orderData)
      .then((response) => {
          
          dispatch(purchaseSuccess(response.data.name, orderData));
      })
      .catch((error) => {
          console.log(error)
        dispatch(purchaseFailure(error))
      });
    }
} 

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}


export const orderFailure = (error) => {
    return {
        type: actionTypes.ORDERS_FAIL,
        error: error
    }
}

export const orderSuccess = (orders) => {
    return {
        type: actionTypes.ORDERS_SUCCESS,
        orders: orders
    }
}
export const orderStart = () => {
    return {
        type: actionTypes.ORDERS_START
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(orderStart())
    axios.get('/orders.json')
    .then( (res)=>{
        const fetchedOrders = [];
        console.log(res.data);
        for(let key in res.data) {
            fetchedOrders.push( {
                ...res.data[key],
                id: key
            });
        }
      
        dispatch(orderSuccess(fetchedOrders))
    } )
    .catch(err=>{
        console.log(err)
        dispatch(orderFailure(err));
    })
}
}