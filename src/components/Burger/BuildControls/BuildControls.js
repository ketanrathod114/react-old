import React from 'react'

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls =[
    { label: 'Meat', type: "meat" },
    { label: 'Bacon', type: "bacon" },
    { label: 'Salad', type: "salad" },
    { label: 'Cheese', type: "cheese" },

]

const buildControls = (props) => (
    <div  className={classes.BuildControls}>
        <p>Current Price: <b>{props.price.toFixed(2)}</b></p>
        {controls.map((el)=>(
            <BuildControl key={el.label} label={el.label}
            removed={()=>props.ingredientRemoved(el.type)}
            added={()=>props.ingredientAdded(el.type)}
            disabled={props.disabled[el.type]} />
        ))}
        <button  className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>ORDER NOW</button>
    </div>
);

export default buildControls;