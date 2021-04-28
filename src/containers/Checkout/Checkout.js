import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

import { connect } from "react-redux";
import * as actions from './../../store/actions/index'

class Checkout extends Component {
  // state={
  //     ingredients: {
  //         salad: 2,
  //         meat: 1,
  //         cheese: 1,
  //         bacon: 1
  //     },
  //     totalPrice: 0
  // }

  // componentWillMount(){
  //     const query = new URLSearchParams(this.props.location.search)
  //     // const price = new URLSearchParams(this.props.location.price)
  //     // console.log(new URLSearchParams(this.props.location.search));
  //     const ingredients = {};
  //     // for (let params in query.entries()){
  //     //     ingredient[params[0]] = +params[1]
  //     // }
  //     // console.log()

  //     query.forEach((value, key) => (ingredients[key] = Number(value)));
  //     if(this.props.location.state){
  //         this.setState({totalPrice: this.props.location.state.price || ''});
  //     }

  //     // console.log(this.state.totalPrice)
  //     this.setState({ingredients});
  // }

    // componentWillMount() {
    //     this.props.onInitPurchase();
    // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace("checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    
    if (this.props.ings) {
        const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null
      summary = (
        <div>
            {purchaseRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            // render={(props)=>(<ContactData {...props} ingredients={this.props.ings} totalPrice={this.state.totalPrice} />)}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burger.ingredients,
    price: state.burger.totalPrice,
    purchased: state.order.purchased
  };
};

// const mapDispatchToProps = dispatch => {
//     return {
        
//     }
// }   

export default connect(mapStateToProps)(Checkout);
