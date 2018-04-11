import * as actionTypes from './actionTypes';
import instance from '../../axios-orders';
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
      type: actionTypes.PURCHASE_BURGER_SUCCESS,
      orderID: id,
      orderData: orderData
    }
};

export const purchaseInit = () => {
  return{
    type: actionTypes.PURCHASE_INIT
  };
};
export const purchaseBurgerFailed = (errorMessage) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: errorMessage
  }
};
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};
export const purchase = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    instance.post('/orders.json?auth=' + token, orderData)
            .then(response => {
              dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
              dispatch(purchaseBurgerFailed(error));
            });

  }
};
export const fetchOrdersSuccess = (orders) => {
  return{
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders

  };
};
export const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error
  };
};
export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}
export const fetchOrders = (token) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    instance.get('/orders.json?auth=' + token)
        .then(result => {
          let fetchedOrders = [];

          for (let key in result.data){
            fetchedOrders.push({...result.data[key],
            id: key});
          }
          dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(err => {
          dispatch(fetchOrdersFailed(err));
        })
  }
}
