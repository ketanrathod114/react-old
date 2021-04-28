import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-order";
import withErrorHandler from "../../hoc/error/errorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "./../../store/actions/index";
import { connect } from "react-redux";

class Orders extends Component {
  // state ={
  //     loading: false,
  //     orders: []
  // }
  componentDidMount() {
    // this.setState({loading: true})

    // axios.get('/orders.json')
    // .then( (res)=>{
    //     const fetchedOrders = [];
    //     // console.log(res.data);
    //     for(let key in res.data) {
    //         fetchedOrders.push( {
    //             ...res.data[key],
    //             id: key
    //         });
    //     }

    //     this.setState({loading: true, orders: fetchedOrders});
    //     console.log(typeof(this.state.orders))
    //     console.log(this.state.orders)
    // } )
    // .catch(err=>{
    //     console.log(err)
    //     this.setState({loading: true})
    // })
    this.props.onOrders();
  }

  render() {
    let orderDiv;
    orderDiv = <Spinner />;

    // console.log(this.props.orders);
    if (this.props.orders) {
      orderDiv = this.props.orders.map((order) => {
        return (
          <Order
            ingredients={order.ingredients}
            price={order.price}
            key={order.id}
          />
        );
      });
    }
    // console.log(orderDiv)
    return (
      <div>
        {/* {this.state.orders.map((order)=>{
                return <Order ingredients={order.ingredients}
                price={order.price} 
                key={order.id} /> })} */}
        {orderDiv}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
