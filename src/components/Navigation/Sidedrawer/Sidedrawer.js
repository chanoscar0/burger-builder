import React, {Fragment} from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Sidedrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const Sidedrawer = (props) => {
  let attachedClasses = [classes.Sidedrawer, classes.Close];
  if (props.open){
    attachedClasses = [classes.Sidedrawer, classes.Open];
  }
  return (
    <Fragment>
      <Backdrop show = {props.open} showBackdrop = {props.closed}/>
      <div className = {attachedClasses.join(' ')}>
        <Logo height = '11%' margin = '32px'/>
        <nav>
          <NavigationItems isAuthenticated = {props.isAuth} />
        </nav>

      </div>
    </Fragment>

  );
};

export default Sidedrawer;
