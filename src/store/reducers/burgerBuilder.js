import * as actionTypes from '../actions/actionTypes'
// import { updateObject } from './../utility'

const initialState = {
  ingredients: null,
  errorSet: false,
  totalPrice: 4
}
const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};
const reducer =( state =  initialState, action) => {

  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return{
        ...state,
        ingredients:{
          ...state.ingredients,
          [action.ingredientName] : state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      }
    case actionTypes.REMOVE_INGREDIENTS:
      return{
        ...state,
        ingredients:{
          ...state.ingredients,
          [action.ingredientName] : state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      }
      case actionTypes.SET_INGREDIENTS:
        return{
          ...state,
          ingredients: action.ingredients,
          errorSet: false,
          totalPrice: 4
        }
        case actionTypes.FETCH_FAIL:
          return{
            ...state,
            errorSet: true
          }
      default:
        return state
  }

}

export default reducer;