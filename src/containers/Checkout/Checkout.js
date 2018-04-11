import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
class Checkout extends Component {

  onCheckoutCanceled = () => {
    this.props.history.goBack();
  }
  onContinueHandler = () => {
    console.log(this.props);

    this.props.history.replace('/checkout/contact-data');
  }
  render(){
    let summary = <Redirect to = '/'/>
    if (this.props.ings){
      const purchasedRedirect = this.props.purchased ? <Redirect to = '/' /> : null;

      summary =   (<div>
                    {purchasedRedirect}
                    <CheckoutSummary onCheckoutCanceled = {this.onCheckoutCanceled}
                         ingredients = {this.props.ings}
                         onContinueHandler = {this.onContinueHandler}/>
                    <Route path = {this.props.match.url + '/contact-data'}
                           component = {ContactData} /></div>)
    }
    return(
      summary
    )
  }
}
const mapStateToProps = state => {
  return{
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}
const mapDispatchToProps = dispatch => {
  return {
      onInitPurchase: () => dispatch(actions.purchaseInit())
  };
};
export default connect(mapStateToProps)(Checkout);
