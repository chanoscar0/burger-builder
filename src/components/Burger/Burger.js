import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.css'

const Burger = (props) => {
  let tIngredients = Object.keys(props.ingredients)
                       .map(ingKey => {
                         return [...Array(props.ingredients[ingKey])].map((_, i) => {
                           return <BurgerIngredient key={ingKey + i} type={ingKey} />;
                         }); //[,] We have an array with 2 elements
                       })
                       .reduce((arr,el) => {
                          return arr.concat(el)
                        }, []);
  if (tIngredients.length === 0){
    tIngredients = <p>Please start adding ingredients!</p>;
  }
  return (
    <div className = {classes.Burger}>
      <BurgerIngredient type = "bread-top"/>
      {tIngredients}
      <BurgerIngredient type = "bread-bottom"/>
    </div>
  );
}
export default Burger;
