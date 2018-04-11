import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleMenu from '../ToggleMenu/ToggleMenu';

const Toolbar = (props) => (
  <header className = {classes.Toolbar}>
    <ToggleMenu clicked = {props.clicked}/>
    <Logo height = '80%'/>
    <nav className = {classes.DesktopOnly}>
        <NavigationItems isAuthenticated = {props.isAuth} />
    </nav>
  </header>
);
export default Toolbar;
