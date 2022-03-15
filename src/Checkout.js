import React from 'react'
import './Checkout.css';
import Subtotal from './Subtotal';
import {useStateValue} from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
function Checkout() {
    const [{basket, user}, dispatch] = useStateValue()
    return (
        <div className="checkout">
            <div className="checkout_left">
                <img
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                    alt="" 
                    className="checkout_ad"
                />
                <h2>{user?.email}</h2>
                <div>
                    <h1 className="checkout_title">
                        {
                            basket.map((item) => (
                                <CheckoutProduct 
                                key={item.id} 
                                title={item.title}
                                id={item.id} 
                                price={item.price}
                                image={item.image} 
                                rating={item.rating}
                                />))
                        }
                    </h1>
                </div>
            </div>
            <div className="checkout_right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
