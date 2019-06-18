import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';

class orders extends Component {
    state = {
        orders: [],
        isLoading: true
    }

    componentDidMount () {
        axios.get('/order.json')
            .then(response => {
                const fetchedOrders = [];
                for(let order in response.data) {
                    fetchedOrders.push({
                        ...response.data[order],
                        key: order
                    });
                }
                this.setState({ orders: fetchedOrders, isLoading: false}) 
            })
            .catch(error => this.setState({isLoading: false}));
    }
    render() {
        let orders = <Spinner />;

        if(!this.state.isLoading) orders = this.state.orders.map(order =>{
            return <Order
                        ingredients={order.ingredients}
                        key={order.key}
                        totalPrice={ +order.totalPrice } />
        }) ;

        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(orders, axios);