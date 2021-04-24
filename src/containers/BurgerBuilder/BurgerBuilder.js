import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";

import { connect } from 'react-redux'
import * as actionTypes from './../../store/action'

import errorHandler from "../../hoc/error/errorHandler";



class BurgerBuilder extends Component {
  state = {
    // ingredients: {
    //   salad: 0,
    //   bacon: 0,
    //   cheese: 0,
    //   meat: 0,
    // },

    // totalPrice: 4,
    // purchasable: false,
    purchasing: false,
    loading: false,
    errorSet: false
  };

  componentDidMount() {
    // axios
    //   .get(
    //     "https://react-burger--2-default-rtdb.firebaseio.com/ingredients.json"
    //   )
    //   .then((response) => {
    //     this.setState({ ingredients: response.data });
    //     // console.log(this.state.ingredients)
    //   })
    //   .catch(error=>{
    //     // console.log('i am error');
    //     this.setState({ errorSet: true });
    //   });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    // this.setState({
    //   loading: true,
    // });
    // // console.log("you continue" + this.state.loading);
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Ketan",
    //     address: {
    //       street: "Main Road",
    //       zipcode: "400001",
    //       country: "India",
    //     },
    //     email: "ketan@gmail.com",
    //   },
    //   deliveryMethod: "fastest",
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then(() => {
    //     this.setState({ loading: false, purchasing: false });
    //     console.log(this.state.purchasing);
    //   })
    //   .catch(() => {
    //     this.setState({ loading: false, purchasing: false });
    //   });

    // const query = [];
    // for ( let i in this.state.ingredients)
    // {
    //   query.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    // }
    // const queryString = query.join('&')
    this.props.history.push('/checkout')
  };
  updatePurchaseState(ingredients) {
    //   const ingredients = {
    //       ...this.state.ingredients
    //   }
    const sum = Object.keys(ingredients)
      .map((igkey) => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    // this.setState({ purchasable: sum > 0 });
      // console.log(sum , 'sum');
    return sum > 0;
  }

  // addIngredient = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredient = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredient[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });
  //   this.updatePurchaseState(updatedIngredient);
  // };

  // removeIngredient = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredient = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredient[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });
  //   this.updatePurchaseState(updatedIngredient);
  // };

  render() {

    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    
    
    let burger = this.state.errorSet ?  <p>Ingredients can't be loaded</p> : <Spinner />;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <div>
            <BuildControls
              ingredientAdded={this.props.onIngredientsAdded}
              ingredientRemoved={this.props.onIngredientsRemoved}
              disabled={disabledInfo}
              purchasable={this.updatePurchaseState(this.props.ings)}
              price={this.props.price}
              ordered={this.purchaseHandler}
            />
          </div>
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClose={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings : state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
return {
  onIngredientsAdded: (ingName) => dispatch({type:actionTypes.ADD_INGREDIENTS, ingredientName: ingName}),
  onIngredientsRemoved: (ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENTS, ingredientName: ingName}),
}
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, axios));
