import * as actionTypes from './actionTypes'
import axios from '../../axios-order'
export const addIngredient = (ingname) => {
    return {
        type : actionTypes.ADD_INGREDIENTS,
        ingredientName : ingname
    }
}

export const removeIngredient = (ingname) => {
    return {
        type : actionTypes.REMOVE_INGREDIENTS,
        ingredientName : ingname
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}
export const fetchFail = (ingredients) => {
    return {
        type: actionTypes.FETCH_FAIL,
    }
}

export const initIngredients = () =>{
    return dispatch => {
        axios
        .get(
          "https://react-burger--2-default-rtdb.firebaseio.com/ingredients.json"
        )
        .then((response) => {
         dispatch(setIngredients(response.data));
        })
        .catch(error=>{
         dispatch(fetchFail())
        });
    }
}