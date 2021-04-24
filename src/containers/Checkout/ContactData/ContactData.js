import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

import {connect} from 'react-redux';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elemntConfig: {
          type:'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid:false
      },
        street: {
          elementType: 'input',
          elemntConfig: {
            type:'text',
            placeholder: 'Street'
          },
          value: '',
          validation: {
            required: true
          },
          valid:false
        },
        zipcode: {
          elementType: 'input',
          elemntConfig: {
            type:'text',
            placeholder: 'Zipcode'
          },
          value: '',
          validation: {
            required: true
          },
          valid:false
        },
        country: {
          elementType: 'input',
          elemntConfig: {
            type:'text',
            placeholder: 'Country'
          },
          value: '',
          validation: {
            required: true
          },
          valid:false
        },
      email: {
        elementType: 'input',
        elemntConfig: {
          type:'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid:false
      },
      deliveryMethod: {
        elementType: 'select',
        elemntConfig: {
          options:[
            {
            value:'fastest',
            displayvalue: 'Fastest',
          },
          {
            value:'cheapest',
            displayvalue: 'Cheapest',
          }
        ]
        },
        validation: {
          required: false
        },
        value: 'fastest',
        valid:true
       
      },
    },
    loading: false,
    formIsvalid:false
  };

  checkValidity(value, rules) {
    let isValid = true;

    if(rules.required){
      isValid = value.trim() !== '';
    }
    return isValid
  }

  onOrderHandler = (e) => {
    e.preventDefault();
   
    this.setState({
      loading: true,
    });
    const fromData={};
    for(let El in this.state.orderForm){
      fromData[El] = this.state.orderForm[El].value
    }
    // console.log(this.props);
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: fromData
      
    };
    axios
      .post("/orders.json", order)
      .then(() => {
        this.setState({ loading: false });
        // console.log(this.state.purchasing);
        this.props.history.push("/");
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  inputChangedHandler = (event, inp) => {
    const updatedForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedForm[inp]
    }
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedForm[inp] = updatedFormElement;
    // console.log(updatedFormElement);

    let formIsvalid = true;
    for(let el in updatedForm){
     
      formIsvalid = updatedForm[el].valid && formIsvalid
    }
    // console.log(formIsvalid)
    this.setState({orderForm: updatedForm, formIsvalid: formIsvalid})
  }

  render() {
    const formElArray = [];
    for(let key in this.state.orderForm){
      formElArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form onSubmit={this.onOrderHandler}>
      {
        formElArray.map(el=>(
          <Input key={el.id}
          elementType={el.config.elementType}
          elementConfig={el.config.elemntConfig}
          value={el.config.value} 
          invalid={!el.config.valid}
          shouldValidate={el.config.validation.required}
          changed={(event)=>this.inputChangedHandler(event,el.id)} />
        ))
      }
        <Button btnType="Success" disabled={!this.state.formIsvalid}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price : state.totalPrice
  }
}

export default connect(mapStateToProps)(ContactData);
