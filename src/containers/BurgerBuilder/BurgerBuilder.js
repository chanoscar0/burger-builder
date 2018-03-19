import React, {Component, Fragment} from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 1.3,
  cheese: 0.5,
  bacon: 0.7
}

class BurgerBuilder extends Component{
  state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat:  0
      },
      totalPrice: 4
  }

  addIngredientHandler = (type) => {
    let cloneIngredients = {...this.state.ingredients};
    cloneIngredients[type] += 1;
    let newPrice = this.state.totalPrice;
    let priceDifference = INGREDIENT_PRICES[type];
    newPrice += priceDifference;
    this.setState({totalPrice: newPrice, ingredients:cloneIngredients});

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
    }
  }

  render() {
    const disabledInfo = {...this.state.ingredients};

    for (const key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    } // {salad: true, meat: false, bacon: true, cheese: true}
    return (
      <Fragment>
          <Burger ingredients = {this.state.ingredients} />
          <BuildControls ingredients = {this.state.ingredients}
                         ingredientAdded = {this.addIngredientHandler}
                         ingredientRemoved = {this.removeIngredientHandler}
                         disabled = {disabledInfo}/>

      </Fragment>
    );
  }
}
export default BurgerBuilder;
