import React from 'react';
import classes from './BuildControl.css'

const BuildControl = (props) =>(
  <div className = {classes.BuildControl}>
    <div className = {classes.label}>{props.ingredientLabel}</div>
    <button className = {classes.Less} onclick = {props.lClicked}>Less</button>
    <button className = {classes.More} onclick = {props.mClicked}>More</button>
  </div>

);
export default BuildControl;
