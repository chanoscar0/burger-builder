import React from 'react';
import Logo from '../../Logo/Logo';
import classes from './ToggleMenu.css';

const ToggleMenu = (props) => (
  <div  onClick = {props.clicked} className = {classes.ToggleMenu}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);


export default ToggleMenu;
