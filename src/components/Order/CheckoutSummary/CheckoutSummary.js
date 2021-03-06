import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button.js';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {

  return(
    <div className = {classes.CheckOutSummary}>
      <h1>Does your Burger look like how you want it?</h1>
      <div style = {{width: '100%', margin: 'auto'}}>
        <Burger ingredients = {props.ingredients}/>
      </div>
      <Button btnType = "Danger"
              clicked = {props.onCheckoutCanceled}>CANCEL</Button>
      <Button btnType = "Success"
              clicked = {props.onContinueHandler}>CONTINUE</Button>
    </div>
  );
}
export default checkoutSummary;
