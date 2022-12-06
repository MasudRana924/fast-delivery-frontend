import React, { Fragment} from "react";
import { useSelector, useDispatch } from "react-redux";
import './Payment.css'
import { createOrder } from './../../actions/OrderAction';
import { useNavigate } from 'react-router-dom';
const Payment = () => {
    const history = useNavigate();
     const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
     const dispatch = useDispatch();
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };
    const submitOrder =(event) => {
        dispatch(createOrder(order));
        alert('success')
        history('/')
    }
    return (
        <Fragment>
            <div className="paymentContainer">
            <button onClick={submitOrder} className="payment-btn ">Cash On Delivery</button>
            </div>
        </Fragment>
    );
};

export default Payment;