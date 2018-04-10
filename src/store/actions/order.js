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

export const purchaseBurgerStart = (orderData) => {
  return dispatch => {
    instance.post('/orders.json', orderData)
            .then(response => {
              dispatch(purchaseBurgerSuccess(response.data, orderData));
            })
            .catch(error => {
              dispatch(purchaseBurgerFailed(error));
            });

  }
}
