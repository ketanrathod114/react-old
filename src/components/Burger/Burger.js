import React from 'react';

import { withRouter } from 'react-router-dom'
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    // console.log(props)
    //study this ****************************
    let transformedIngredients = Object.keys(props.ingredients)
    .map( (igkey) => {
        return [...Array(props.ingredients[igkey])].map(
            (_,i)=>{
                return <BurgerIngredient key={igkey+i} type={igkey} />;
            }
        );
    })
    .reduce( (arr, el) => { 
        return arr.concat(el);
     }, []);
     if(transformedIngredients.length === 0){
         transformedIngredients = <p>Please start adding Ingredients</p>
     }
    // console.log(transformedIngredients);
    return(
        <div className = {classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {/* <BurgerIngredient type="meat" />
            <BurgerIngredient type="cheese" /> */}
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default withRouter(burger);