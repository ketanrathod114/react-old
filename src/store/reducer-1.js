const initialState={
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


const reducer = (state = initialState, action) => {
    
    return state;
}

export default reducer;