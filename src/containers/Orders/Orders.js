import React, { Component } from 'react';
import instance from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';
class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }
  componentDidMount(){
    const fetchedOrders = [];

    instance.get('/orders.json')
        .then(result => {
          for (let key in result.data){
            fetchedOrders.push({...result.data[key],
            id: key});
          }
          console.log(fetchedOrders);
          this.setState({loading: false, orders: fetchedOrders})
        })
        .catch(err => {
          this.setState({loading: false})
        })
  }
  render(){
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}
export default withErrorHandler(Orders, instance);
