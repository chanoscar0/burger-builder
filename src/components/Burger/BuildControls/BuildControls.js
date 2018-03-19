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
    <p>Current Price: ${props.totalPrice.toFixed(2)}</p>
    {controls.map(control => (
      <BuildControl key = {control.label}
                    ingredientLabel = {control.label}
                    added = {() => props.ingredientAdded(control.type)}
                    removed = {() => props.ingredientRemoved(control.type)}
                    disabled = {props.disabled[control.type]}/>
    ))}
  </div>
);

export default BuildControls;
