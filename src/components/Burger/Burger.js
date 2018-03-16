import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.css'

const Burger = (props) => {
  console.log(Object.keys(props.ingredients));
  const tIngredients = Object.keys(props.ingredients)
                       .map(ingKey => {
                         return [...Array(props.ingredients[ingKey])].map((_, i) => {
                           return <BurgerIngredient key={ingKey + i} type={ingKey} />;
                           console.log(<BurgerIngredient key = {ingKey + i} type = {ingKey} />); //result is an Array with [meat0, meat1,cheese0,cheese1,salad0]
                         }); //[,] We have an array with 2 elements
                       });
  return (
    <div className = {classes.Burger}>
      <BurgerIngredient type = "bread-top"/>
      {tIngredients}
      <BurgerIngredient type = "bread-bottom"/>
    </div>

  );
}
export default Burger;
