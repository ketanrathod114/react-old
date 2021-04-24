import React, { Component } from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

  componentDidUpdate(){
    console.log('order summary')
  }

  render() {

    const ingredientSummary = Object.keys(this.props.ingredients).map((igkey) => {
      return (
        <li key={igkey}>
          <span style={{ textTransform: "capitalize" }}>{igkey}</span>:{" "}
          {this.props.ingredients[igkey]}
        </li>
      );
    });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger blah blah, ingredients: </p>
        <ul>{ingredientSummary}</ul>
        <h4>Total Price: {this.props.price.toFixed(2)}</h4>
        <p>Continue to Checkout</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
      </Aux>
    );

  }
 
};

export default OrderSummary;
