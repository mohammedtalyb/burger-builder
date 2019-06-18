import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    for (let ingredientKey in props.ingredients) {
        ingredients.push(
            {
                name: ingredientKey,
                quantity: props.ingredients[ingredientKey]
            }
        );
    }

    const ingredientsOutput = ingredients.map(ingredient => {
        return <span className={classes.Ingredient} key={ingredient.name}>
            {ingredient.name} ({ingredient.quantity})
        </span>;
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput} </p>
            <p>Total Price: <strong>USD {props.totalPrice}</strong></p>
        </div>
    );
}

export default order;