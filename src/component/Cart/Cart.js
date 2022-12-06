import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import CartItems from './CartItems';
import { addItemsToCart, removeItemsFromCart } from './../../actions/CartAction';
import './Cart.css'
import cartIcon from '../../Images/icons8-add-shopping-cart-50.png'
import shippingIcon from '../../Images/icons8-document-delivery-48.png'
import confirmIcon from '../../Images/icons8-verified-account-50.png'
import paymentIcon from '../../Images/icons8-payment-64.png'


const Cart = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    };
    const checkoutHandler = () => {
        history("/login?redirect=shipping");
    };
    return (
        <div className="mt-5">
            {cartItems.length === 0 ? (
                <div className="emptyCart ">
                    <p>No Product in Your Cart</p>
                    <Link to="/products">View Products</Link>
                </div>
            ) : (

                <div className="cartPage w-75 mx-auto">
                    <div className="stepper">
                        <div className="stepper-details">
                            <img src={cartIcon}alt="" className="stepper-img" />
                            <p className="ms-3">Cart</p>
                        </div>
                        <hr  className="cart-hr"/>
                        <div className="stepper-details">
                        <img src={shippingIcon}alt="" className="stepper-img" />
                            <p>Shipping</p>
                        </div>

                        <hr />
                        <div className="stepper-details">
                        <img src={confirmIcon}alt="" className="stepper-img" />
                            <p>Confirm</p>
                        </div>

                        <hr />
                        <div className="stepper-details">
                        <img src={paymentIcon}alt="" className="stepper-img" />
                            <p>Payment</p>
                        </div>


                    </div>
                    <div className="cartHeader">
                        <p>Product</p>
                        <p>Quantity</p>
                        <p>Subtotal</p>
                    </div>

                    {cartItems &&
                        cartItems.map((item) => (
                            <div className="cartContainer" key={item.product}>
                                <CartItems item={item} deleteCartItems={deleteCartItems} />
                                <div className="cartInput">
                                    <button
                                        onClick={() =>
                                            decreaseQuantity(item.product, item.quantity)
                                        }
                                        className="btn-quantity"
                                    >
                                        -
                                    </button>
                                    <input type="number" value={item.quantity} readOnly />
                                    <button
                                        onClick={() =>
                                            increaseQuantity(
                                                item.product,
                                                item.quantity,
                                                item.stock
                                            )
                                        }
                                        className="btn-quantity"
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="cartSubtotal">{`₹${item.price * item.quantity
                                    }`}</p>
                            </div>
                        ))}

                    <div className="cartGrossProfit">
                        <div></div>
                        <div className="cartGrossProfitBox">
                            <p>Gross Total</p>
                            <p>{`₹${cartItems.reduce(
                                (acc, item) => acc + item.quantity * item.price,
                                0
                            )}`}</p>
                        </div>
                        <div></div>
                        <div className="checkOutBtn">
                            <button onClick={checkoutHandler}>Check Out</button>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
};

export default Cart;