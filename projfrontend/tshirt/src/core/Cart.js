import React, { useState, useEffect } from 'react';
import "../styles.css";
import Base from "./Base"
import Card from './Card';
import { getAllProducts } from './helper/coreapicalls';
import { loadCart } from './helper/cartHelper';
import StripeCheckout from './StripeCheckout';

const Cart = () => {

    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false);

    const loadAllProducts = () => {
        return (
            <div>

                {
                    products &&
                    products.map((product, index) => (
                        <Card key={index}
                            product={product}
                            removeFromCart={true}
                            addtoCart={false}
                            setReload={setReload}
                            reload={reload}
                        />
                    ))
                };
            </div>
        )
    }

    const loadCheckout = () => {
        return (
            <div>
                <h2>section to load checkout</h2>
            </div>
        )
    }

    useEffect(() => {
        setProducts(loadCart())
    }, [reload])


    return (
        <Base title="CART Page" description="ready to checkout">

            <div className="row">
                <div className="col-6">{loadAllProducts()}</div>
                <div className="col-6">
                    <StripeCheckout
                        products={products}
                        setReload={setReload}
                        reload={reload}
                    />
                </div>
            </div>

        </Base>);
}

export default Cart;