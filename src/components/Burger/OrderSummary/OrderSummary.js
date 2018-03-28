import React, {Fragment, Component} from 'react';
import Button from '../../UI/Button/Button';
class OrderSummary extends Component {
  componentWillUpdate(){
    console.log('[Order Summary] will update');
    console.log(this.props);

  }
  purchaseCanceled() {
    this.props.history.push('/');
  }
  render(){
    const ingredientSummary = Object.keys(this.props.ingredients)
                              .map(ingKey => {
                                return (<li key = {ingKey}><span style = {{textTransform: 'capitalize'}}>{ingKey}: </span>
                                       {this.props.ingredients[ingKey]}</li>);
                              });
    return (
      <Fragment>
        <h3>Your Order </h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <strong><p>Total Price: ${this.props.price.toFixed(2)} </p></strong>
        <p>Continue to checkout?</p>
        <Button btnType = 'Danger' clicked = {this.props.purchaseCanceled}>CANCEL</Button>
        <Button btnType = 'Success' clicked = {this.props.purchaseContinued}>CONTINUE</Button>

      </Fragment>
    );
  }
}

export default OrderSummary;
