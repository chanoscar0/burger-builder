import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'}
];

const BuildControls = (props) => (
  <div className = {classes.BuildControls}>
    {controls.map(control => (
      <BuildControl key = {control.label} ingredientLabel = {control.label} />
    ))}
  </div>
);

export default BuildControls;
