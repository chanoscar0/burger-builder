import React, {Fragment} from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop'

const Modal = (props) => (
  <Fragment>
      <Backdrop show = {props.show} showBackdrop = {props.modalClosed}/>
      <div className = {classes.Modal}
        style = {{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}>
        {props.children}
      </div>
  </Fragment>
);

export default Modal;