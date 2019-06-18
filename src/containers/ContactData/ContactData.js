import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        name: '',
        address: {
            city: '',
            pincode: ''
        },
        deliveryMethod: '',
        ingredients: null,
        isLoading: false,
        totalPrice: 0
    }

    orderHandler = (event) => {
        event.preventDefault();
        
        this.setState({ isLoading: true });
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
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
            .then(response => {
                this.setState({ isLoading: false });
                this.props.history.push('/');
            })
            .catch(error => this.setState({ isLoading: false}));
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postalCode" placeholder="Postal Code" />
                <Button buttonType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        );

        if (this.state.isLoading) form = <Spinner />;
        
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;