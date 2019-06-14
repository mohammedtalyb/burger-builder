import React, { Component } from 'react';
import Aux from '../../Hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1,
    meat: 1.7,
    bacon: 1
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            meat: 0,
            cheese: 0
        },
        totalprice: 4,
        purchasable: false,
        purchasing: false,
        isLoading: false
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map( ingredientKey => ingredients[ingredientKey])
                    .reduce((sum, ingredientValue) => sum + ingredientValue, 0);
        this.setState({ purchasable: sum > 0 });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.setState({ isLoading: true });

        const order = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalprice,
            customer: {
                name: 'talib',
                address: {
                    city: 'mira road',
                    pinCode: '401107',
                },
                deliveryMethod: 'fastest'
            }
        }

        axios.post('/order.json', order)
            .then(response => this.setState({ isLoading: false, purchasing: false }))
            .catch(error => this.setState({ isLoading: false, purchasing: false }));
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatesIngredients = { ...this.state.ingredients };
        updatesIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalprice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: updatesIngredients,
            totalprice: newPrice
        })
        this.updatePurchaseState(updatesIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) return;
        const updatedCount = oldCount - 1;
        const updatesIngredients = { ...this.state.ingredients };
        updatesIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalprice;
        const newPrice = oldPrice - priceAddition;
        this.setState({
            ingredients: updatesIngredients,
            totalprice: newPrice
        });
        this.updatePurchaseState(updatesIngredients);
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        let orderSummary = <OrderSummary 
        price={this.state.totalprice}
        continuePurchase={this.purchaseContinueHandler}
        cancelPurchase={this.purchaseCancelHandler}
        ingredients={this.state.ingredients} />;

        if(this.state.isLoading) orderSummary = <Spinner />;

        for (let key in disabledInfo) disabledInfo[key] = disabledInfo[key] <= 0;

        return (
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.totalprice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;