import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const BuildControls = (props) => {

    const controls = [
        {label: 'Salad', type: 'salad'},
        {label: 'Bacon', type: 'bacon'},
        {label: 'Cheese', type: 'cheese'},
        {label: 'Meat', type: 'meat'},
    ];
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            { controls.map(ctrl => <BuildControl 
            key={ctrl.label} 
            ingredientLabel={ctrl.label}
            addIngredient={() => props.addIngredient(ctrl.type)}
            removeIngredient={() => props.removeIngredient(ctrl.type)}
            disabled={props.disabledInfo[ctrl.type]} />) }
            <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered} >Order Now</button>
        </div>
    );
}

export default BuildControls;