import React from 'react';
import CheckoutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
import Contactdata from '../ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends React.Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    checkoutContinueHandler = () => {
        this.props.history.replace(this.props.match.path +'/contact-data');
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    componentWillMount() {
        console.log('willMount');
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ ingredients: ingredients, totalPrice: price });
    }

    render() {
        console.log("render");
        
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelHandler}
                    checkoutContinued={this.checkoutContinueHandler} />
                <Route path={this.props.match.path + '/contact-data'}
                    render={ props => {
                        return (
                            <Contactdata ingredients={this.state.ingredients}
                                totalPrice={this.state.totalPrice}
                                {...props} />
                        );
                    }} />
            </div>
        );
    }
}

export default Checkout;