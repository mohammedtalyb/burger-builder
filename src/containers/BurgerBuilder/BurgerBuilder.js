import React, { Component } from 'react';
import Aux from '../../Hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1,
    meat: 1.7,
    bacon: 1
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalprice: 4,
        purchasable: false,
        purchasing: false,
        isLoading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-burger-builder-3bb2b.firebaseio.com/ingredients.json')
            .then(response => this.setState({ ingredients: response.data }))
            .catch(error => this.setState({ error: true }));
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(ingredientKey => ingredients[ingredientKey])
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
        const queryParams = [];
        for (let ingredientkey in this.state.ingredients) {
            queryParams.push(encodeURIComponent(ingredientkey) + '=' +encodeURIComponent(this.state.ingredients[ingredientkey]));
        }
        queryParams.push('price=' +this.state.totalprice);

        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
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
        let orderSummary = null;
        let burger = this.state.error ? <p>page Can't load</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = <Aux>
                        <Burger ingredients={this.state.ingredients} />
                        <BuildControls
                            addIngredient={this.addIngredientHandler}
                            removeIngredient={this.removeIngredientHandler}
                            disabledInfo={disabledInfo}
                            price={this.state.totalprice}
                            purchasable={this.state.purchasable}
                            ordered={this.purchaseHandler} />
                    </Aux>;

            orderSummary = <OrderSummary
                price={this.state.totalprice}
                continuePurchase={this.purchaseContinueHandler}
                cancelPurchase={this.purchaseCancelHandler}
                ingredients={this.state.ingredients} />;
        }

        if (this.state.isLoading) orderSummary = <Spinner />;

        for (let key in disabledInfo) disabledInfo[key] = disabledInfo[key] <= 0;

        return (
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);