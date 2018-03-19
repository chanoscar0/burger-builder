import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const BuildControls = (props) => (
  <div>
    <BuildControl ingredientLabel = "bacon" />
    <BuildControl ingredientLabel = "salad" />
    <BuildControl ingredientLabel = "meat" />
    <BuildControl ingredientLabel = "cheese" />
  </div>
);

export default BuildControls;
