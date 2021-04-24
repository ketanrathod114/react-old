import React from 'react'

import classes from './Order.css'

const Order = (props) => {
    const ingredients = [];

    for(let ing in props.ingredients){
        ingredients.push({name: ing,
        amount: props.ingredients[ing]})
    }
    const ingredDiv = ingredients.map(ig=>{
        return <span style={{padding:'3px', border:'1px solid #ddd', marginRight: '3px'}} key={ig.name}>{ig.name} ({ig.amount})</span> 
    })
    return (
        <div className={classes.Order}>
            <b>Ingredients: </b>
            {ingredDiv}
            <p>Price: <strong>{props.price}</strong></p>
        </div>
    )
}

export default Order;