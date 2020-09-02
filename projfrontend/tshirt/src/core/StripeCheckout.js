import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { Link } from 'react-router-dom';
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from '../backend';
import { createOrder } from './helper/orderHelper';



const StripeCheckout = ({ products,
    setReload = f => f, reload = undefined }) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    });

    const token = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated().user._id

    const getFinalAmount = () => {
        let amount = 0
        products.map(p => {
            amount = amount + p.price
        })
        return amount
    }

    const makePayment = token => {
        const body = {
            token,
            products
        };
        const headers = {
            "Content-Type": "application/json"
        };
        return fetch(`${API}/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        })
            .then(response => {
                console.log(response);
                //call further methods
                const orderData = {
                    products: products,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount
                }
                createOrder(userId, token, orderData);
                cartEmpty(() => {
                    console.log("diw we creash?")
                })

                setReload(!reload);
            })
            .catch(error => console.log(error));
    };



    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutButton
                stripeKey="pk_test_WK7iFHSg6dIDYYToyKlxuABy00ii9zMt3l"
                token={makePayment}
                amount={getFinalAmount() * 100}
                name="Buy Tshirts"
                shippingAddress
                billingAddress
            >
                <button className="btn btn-success">Pay with stripe</button>
            </StripeCheckoutButton>
        ) : (
                <Link to="/signin">
                    <button className="btn-warning">Signin</button>
                </Link>
            )
    }

    return (
        <div>
            <h3 className="text-white">Stripe loaded {getFinalAmount()}</h3>
            {showStripeButton()}
        </div>
    );
}

export default StripeCheckout;