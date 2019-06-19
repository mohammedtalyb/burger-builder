import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Mail'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                value: ''
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your City'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                value: ''
            },
            pinCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Pincode'
                },
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false,
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        isFormValid: false,
        isLoading: false
    }

    inputChangehandler = (event, inputIdenfier) => {
        const updatedForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedForm[inputIdenfier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedForm[inputIdenfier] = updatedFormElement;

        let isFormValid = true;
        for(let inputIdentifierKey in updatedForm) {
            isFormValid = updatedForm[inputIdentifierKey].valid && isFormValid;
        }

        this.setState({orderForm: updatedForm, isFormValid: isFormValid});
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });

        const formData = {};
        for(let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            orderData: formData
        }

        axios.post('/order.json', order)
            .then(response => {
                this.setState({ isLoading: false });
                this.props.history.push('/');
            })
            .catch(error => this.setState({ isLoading: false }));
    }

    checkValidity(value, rules) {
        let isValid = true;
        
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    render() {
        const formElementsArray = [];

        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangehandler(event, formElement.id)}
                        inValid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched} />
                ))}
                <Button buttonType="Success" disabled={!this.state.isFormValid}>Order</Button>
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