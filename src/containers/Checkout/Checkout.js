import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData'

import { connect } from 'react-redux'

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

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.props.ings}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler} />
                <Route path={this.props.match.path + '/contact-data'} 
                // render={(props)=>(<ContactData {...props} ingredients={this.props.ings} totalPrice={this.state.totalPrice} />)} 
                component={ContactData}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}


export default connect(mapStateToProps)(Checkout);