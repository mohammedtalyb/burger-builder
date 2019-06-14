import React from 'react';
import Aux from '../../../Hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const orderSummary = Object.keys(props.ingredients)
            .map(ingredientKey => {
                return <li key={ingredientKey}>
                            <span style={{ textTransform: 'capitaliaze' }}>{ingredientKey}</span>: {props.ingredients[ingredientKey]}
                        </li>
            });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
                {orderSummary}
            </ul>
            <p><strong>Total Price: {props.price}</strong></p>
            <p>Continue to Checkout?</p>
            <Button buttonType='Success' clicked={props.continuePurchase}>Continue</Button>
            <Button buttonType='Danger' clicked={props.cancelPurchase}>Cancel</Button>
        </Aux>
    );
}

export default orderSummary;

