import * as actionTypes from './actionTypes';
import instance from '../../axios-orders';
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
      type: actionTypes.PURCHASE_BURGER_SUCCESS,
      orderID: id,
      orderData: orderData
    }
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
  }
}

export const purchase = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    instance.post('/orders.json', orderData)
            .then(response => {
              dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
              dispatch(purchaseBurgerFailed(error));
            });

  }
}
