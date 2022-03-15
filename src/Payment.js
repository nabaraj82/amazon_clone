import React, { useState, useEffect } from 'react'
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct'
import { Link } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

function Payment() {
    const history = useHistory();
    const [{ user, basket }, dispatch] = useStateValue();
    const stripe = useStripe();
    const elements = useElements()
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [processing, setProcessing] = useState("");
    const [successed, setSuccessed] = useState(false);
    const [clientSecret, setClientSecret] = useState(false);

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                metho: 'post', 
                url: `/payments/create?total=${getBasketTotal(basket) *100}`
            });
            setClientSecret(response.data.clientSecret);
        }

        getClientSecret();
    }, [basket])
    const handleSubmit = async (event) => {
        event.preventDefaut();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            }
        }).then(({paymentIntent}) => {
            //paymentIntent = payment conformation

            setSuccessed(true);
            setError(null);
            setProcessing(false);
            history.replace('/orders');
        })

    }
    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }
    return (
        <div className='payment'>
            <div className="payment_container">
                <h1>
                    Checkout {
                        <Link to="/checkout">{basket?.length} items</Link>
                    }
                </h1>
                {/* payment section - delivery address */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>Muhanpokari</p>
                        <p>Kathmandu, Nepal</p>
                    </div>
                </div>
                {/* payment section - Review Items */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className="payment_items">
                        {basket.map((item) => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                rating={item.rating}
                                image={item.image}
                                price={item.price}
                            />
                        ))}
                    </div>
                </div>
                {/* payment section - payment method */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment_details">
                        <form on onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment_priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeperator={true}
                                    prefix={"$"}
                                />
                            </div>
                            <button disabled={processing || disabled || successed}>
                                <span>
                                    {processing ? <p>Processing</p> : "Buy Now"}
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
