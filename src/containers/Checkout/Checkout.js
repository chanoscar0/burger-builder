import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  }
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    console.log(query);
    const ingredients = {};
    for (let param of query.entries()){
      ingredients[param[0]] = +param[1];
    }
    this.setState({ingredients: ingredients})
  }
  onCheckoutCanceled = () => {
    this.props.history.goBack();
  }
  onContinueHandler = () => {
    console.log(this.props);

    this.props.history.replace('/checkout/contact-data');
  }
  render(){
    return(
      <div>
        <CheckoutSummary onCheckoutCanceled = {this.onCheckoutCanceled}
                         ingredients = {this.state.ingredients}
                         onContinueHandler = {this.onContinueHandler}/>

        <Route path = {this.props.match.url + '/contact-data'} component = {ContactData} />

      </div>
    )
  }
}
export default Checkout;
