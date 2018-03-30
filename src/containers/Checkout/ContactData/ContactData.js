import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import instance from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer:{
        name: 'Oscar Chan',
        address: {
          street: '1998 Maple Avenue',
          zipcode: '12345',
          country: 'United States'
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest'
    }
    instance.post('/orders.json', order)
            .then(response => {
              this.setState({loading: false});
              this.props.history.push('/');
            })
            .catch(error => {
              this.setState({loading: false});
            });

  }
  render(){
    let form = (
      <form>
        <Input inputtype = 'input' type = 'text' name = 'name' placeholder = 'Your Name' />
        <Input inputtype = 'input' type = 'email' name = 'email' placeholder = 'Your email' />
        <Input inputtype = 'input' type = 'text' name = 'street' placeholder = 'Your Street Address' />
        <Input  inputtype = 'input' type = 'text' name = 'postal' placeholder = 'Your Postal Code' />
        <Button btnType = 'Success' clicked = {this.orderHandler}> ORDER</Button>
      </form>
    );
    if (this.state.loading){
      form = <Spinner />;    }
    return(
      <div className = {classes.ContactData}>
          <h4>Enter your contact data: </h4>
          {form}
      </div>
    )
  }
}
export default ContactData;
