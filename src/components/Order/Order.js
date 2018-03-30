import React from 'react';
import classes from './Order.css'
const Order = (props) => {

  const ingredientArray = [];
  for(let ingredient in props.ingredients){
    ingredientArray.push({name: ingredient,
                     amount: props.ingredients[ingredient]});
  }
  console.log(ingredientArray);
  let ingredientOutput = ingredientArray.map(ingredient => {
    return <span style = {{textTransform: 'capitalize',
                           display: 'inline-block',
                           margin: '0 8px',
                           border: '1px solid #ccc',
                           padding: '5px'}}key = {ingredient.name}> {ingredient.name} ({ingredient.amount})</span>;
  });
  return(
    <div className = {classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>${Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
  );
}



export default Order;
