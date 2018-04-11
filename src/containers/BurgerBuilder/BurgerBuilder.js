import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import instance from '../../axios-orders';

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component{
  state = {
      purchasing: false
  }
  componentDidMount() {
    this.props.onInitIngredients();
  }
  purchaseHandler = () =>{
    if(this.props.isAuthenticated){
      this.setState({purchasing: true})
    }
    else{
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
    
  }
  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }
  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }
  updatePurchaseState(ingredients) {
    const cloneIngredients = {...ingredients};
    const sum = Object.keys(cloneIngredients).map(ingKey => {
      return cloneIngredients[ingKey];
    })
    .reduce((sum, el) => {
      return sum + el;
    }, 0);
    return sum > 0;
  }

  render() {
    const disabledInfo = {...this.props.ings};

    for (const key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    } // {salad: true, meat: false, bacon: true, cheese: true}
    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients couldn't be loaded!</p>: <Spinner />;
    if (this.props.ings){
      burger =  (
       <Fragment>
                      <Burger ingredients = {this.props.ings} />
                      <BuildControls ingredients = {this.props.ings}
                                     ingredientAdded = {this.props.onIngredientAdded}
                                     ingredientRemoved = {this.props.onIngredientRemoved}
                                     disabled = {disabledInfo}
                                     totalPrice = {this.props.price}
                                     purchaseable = {this.updatePurchaseState(this.props.ings)}
                                     purchasing = {this.purchaseHandler}
                                     isAuth = {this.props.isAuthenticated}/>
       </Fragment>
     );
     orderSummary = <OrderSummary ingredients = {this.props.ings}
                                      purchaseCanceled = {this.purchaseCancelHandler}
                                      purchaseContinued = {this.purchaseContinueHandler}
                                      price = {this.props.price}/>
    }

    return (
      <Fragment>
          <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
              {orderSummary}
          </Modal>
          {burger}

      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, instance));
