import React, {Fragment,Component} from 'react';
import { connect } from 'react-redux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component{
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }
  sideDrawerToggleHandler = () =>{
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer};
    });
  }

  render(){
    return(
      <Fragment>
        <Toolbar clicked = {this.sideDrawerToggleHandler} isAuth = {this.props.isAuthenticated}/>
        <Sidedrawer  isAuth = {this.props.isAuthenticated} open = {this.state.showSideDrawer} closed = {this.sideDrawerClosedHandler}/>
        <main className = {classes.Content}>
          {this.props.children}
        </main>
      </Fragment>
    );
  }

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);
