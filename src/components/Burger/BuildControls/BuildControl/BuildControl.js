import React from 'react';
import classes from './BuildControl.css'

const BuildControl = (props) => {

  return (
    <div className = {classes.BuildControl}>
      <div className = {classes.label}>{props.ingredientLabel}</div>
      <button className = {classes.Less}>Less</button>
      <button className = {classes.More}>More</button>
    </div>
  );

}

export default BuildControl;
