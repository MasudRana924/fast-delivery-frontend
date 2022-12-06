import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import './ConfirmOrder.css'
import cartIcon from '../../Images/icons8-add-shopping-cart-50.png'
import shippingIcon from '../../Images/icons8-document-delivery-48.png'
import confirmIcon from '../../Images/icons8-verified-account-50.png'
import paymentIcon from '../../Images/icons8-payment-64.png'

const ConfirmOrder = () => {
    // const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const history = useNavigate();
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * 0.05;

    const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    // const order = {
    //     shippingInfo,
    //     orderItems: cartItems,
    //     itemsPrice: orderInfo.subtotal,
    //     taxPrice: orderInfo.tax,
    //     shippingPrice: orderInfo.shippingCharges,
    //     totalPrice: orderInfo.totalPrice,
    // };
    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };

        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        history("/process/payment");
    };

    return (
        <div className="w-75 mx-auto">

            <div className="stepper-section me-5 pe-5">
                <div className="stepper w-75 mx-auto mt-5">
                    <div className="stepper-details">
                        <img src={cartIcon} alt="" className="stepper-img" />
                        <p className="ms-3">Cart</p>
                    </div>
                    <hr />
                    <div className="stepper-details">
                        <img src={shippingIcon} alt="" className="stepper-img" />
                        <p>Shipping</p>
                    </div>

                    <hr />
                    <div className="stepper-details">
                        <img src={confirmIcon} alt="" className="stepper-img" />
                        <p>Confirm</p>
                    </div>

                    <hr className="shipping-hr" />
                    <div className="stepper-details">
                        <img src={paymentIcon} alt="" className="stepper-img" />
                        <p>Payment</p>
                    </div>


                </div>
            </div>
            <div className="confirmOrderPage">
                <div>
                    <div className="confirmshippingArea">
                        <h2>Shipping Info</h2>
                        {
                            user ? <div className="confirmshippingAreaBox">
                                <div>
                                    <p>Name:</p>
                                    <span>{user.name}</span>
                                </div>
                                <div>
                                    <p>Phone:</p>
                                    <span>{shippingInfo.phoneNo}</span>
                                </div>
                                <div>
                                    <p>Address:</p>
                                    <span>{address}</span>
                                </div>
                            </div> : null
                        }
                    </div>
                    <div className="confirmCartItems">
                        <h2>Your Cart Items :</h2>
                        <div className="confirmCartItemsContainer">
                            {cartItems &&
                                cartItems.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.image} alt="Product" />
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>{" "}
                                        <span>
                                            {item.quantity} X ₹{item.price} ={" "}
                                            <b>₹{item.price * item.quantity}</b>
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                {/*  */}
                <div>

                    <div className="orderSummary">
                        <h5>Order Summary</h5>
                        <div>
                            <div>
                                <p>Subtotal:</p>
                                <span>₹{subtotal}</span>
                            </div>
                            <div>
                                <p>Shipping Charges:</p>
                                <span>₹{shippingCharges}</span>
                            </div>
                            <div>
                                <p>GST:</p>
                                <span>₹{tax}</span>
                            </div>
                        </div>

                        <div className="orderSummaryTotal">
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>₹{totalPrice}</span>
                        </div>

                        <button onClick={proceedToPayment}>Proceed To Payment</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmOrder;