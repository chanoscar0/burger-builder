import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import instance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 1.3,
  cheese: 0.5,
  bacon: 0.7
}

class BurgerBuilder extends Component{
  state = {
      totalPrice: 4,
      purchaseable: false,
      purchasing: false,
      loading: false,
      error: false
  }
  componentDidMount() {
  /*  instance.get('https://burger-builder-a4ab2.firebaseio.com/ingredients.json')
            .then(response => {
              this.setState({ingredients: response.data})
            })
            .catch(error => {
              this.setState({error: true});
            });*/
  }
  purchaseHandler = () =>{
    this.setState({purchasing: true})
  }
  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }
  purchaseContinueHandler = () => {

    const queryParams = [];

    for (let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }
  updatePurchaseState(ingredients) {
    const cloneIngredients = {...ingredients};
    const sum = Object.keys(cloneIngredients).map(ingKey => {
      return cloneIngredients[ingKey];
    })
    .reduce((sum, el) => {
      return sum + el;
    }, 0);
    this.setState({purchaseable: sum > 0});
  }

  addIngredientHandler = (type) => {
    let cloneIngredients = {...this.state.ingredients};
    cloneIngredients[type] += 1;
    let newPrice = this.state.totalPrice;
    let priceDifference = INGREDIENT_PRICES[type];
    newPrice += priceDifference;
    this.setState({totalPrice: newPrice, ingredients:cloneIngredients});
    this.updatePurchaseState(cloneIngredients);
  }

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] <= 0) {
      return;
    } else{
      let cloneIngredients = {...this.state.ingredients};
      cloneIngredients[type] -= 1;
      let priceDifference = INGREDIENT_PRICES[type];
      let newPrice = this.state.totalPrice;
      newPrice -= priceDifference;
      this.setState({totalPrice: newPrice, ingredients:cloneIngredients});
      this.updatePurchaseState(cloneIngredients);
    }
  }

  render() {
    const disabledInfo = {...this.props.ings};

    for (const key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    } // {salad: true, meat: false, bacon: true, cheese: true}
    let orderSummary = null;


    let burger = this.state.error ? <p>Ingredients couldn't be loaded!</p>: <Spinner />;
    if (this.props.ings){
      burger =  (
       <Fragment>
                      <Burger ingredients = {this.props.ings} />
                      <BuildControls ingredients = {this.props.ings}
                                     ingredientAdded = {this.props.onIngredientAdded}
                                     ingredientRemoved = {this.props.onIngredientRemoved}
                                     disabled = {disabledInfo}
                                     totalPrice = {this.state.totalPrice}
                                     purchaseable = {this.state.purchaseable}
                                     purchasing = {this.purchaseHandler}/>
       </Fragment>
     );
     orderSummary = <OrderSummary ingredients = {this.props.ings}
                                      purchaseCanceled = {this.purchaseCancelHandler}
                                      purchaseContinued = {this.purchaseContinueHandler}
                                      price = {this.state.totalPrice}/>
    }
    if (this.state.loading){
      orderSummary = <Spinner />;
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
    ings: state.ingredients
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, instance));
