import React, {Fragment} from 'react';

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
                            .map(ingKey => {
                              return (<li key = {ingKey}><span style = {{textTransform: 'capitalize'}}>{ingKey}: </span>
                                     {props.ingredients[ingKey]}</li>);
                            });
  return(
    <Fragment>
      <h3>Your Order </h3>
      <p>A delicious burger with the follow ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to checkout?</p>

    </Fragment>

  );
};

export default OrderSummary;
