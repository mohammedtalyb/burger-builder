import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {
    var transformedIngredients = Object.keys(props.ingredients)
    .map(ingredientKey => {
        return [...Array(props.ingredients[ingredientKey])].map((_, index) => {
            return <BurgerIngredient key={ingredientKey+index} type={ingredientKey} />
        });
    })
    .reduce((arr, el) => arr.concat(el), []);

    if(transformedIngredients.length === 0) transformedIngredients = <p>Please Start adding ingredients!</p>;

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="burger-top" />
            {transformedIngredients}
            <BurgerIngredient type="burger-bottom" />
        </div>
    );
}

export default burger;