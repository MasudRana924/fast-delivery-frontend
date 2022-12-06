import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getOrderDetails, updateOrder } from '../actions/OrderAction';
import { useDispatch } from 'react-redux';
import { useState, Fragment } from 'react';
import { useEffect } from 'react';
import { clearErrors } from './../actions/OrderAction';
import { UPDATE_ORDER_RESET } from '../constants/OrderConstant';
import Sidebar from './Sidebar';
import Loader from './../component/Shared/Loader';
import './OrderDetails.css'

const OrderDetails = () => {
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("status", status);

        dispatch(updateOrder(orderId, myForm));
        alert('Status update ')
    };



    const [status, setStatus] = useState("");

    useEffect(() => {

        dispatch(getOrderDetails(orderId));
    }, [dispatch, alert, error, orderId]);
    return (
        <Fragment>
            {/* <MetaData title="Process Order" /> */}
            <div className="dashboard-allOrder">
                <Sidebar />
                <div className="newProductContainer">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div
                            className="confirmOrderPage"
                            style={{
                                display: order.orderStatus === "Delivered" ? "block" : "grid",
                            }}
                        >
                            <div>
                                <div className="confirmshippingArea">
                                    <h2>Shipping Info</h2>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p>Name:</p>
                                            <span>{order.user && order.user.name}</span>
                                        </div>
                                        <div>
                                            <p>Phone:</p>
                                            <span>
                                                {order.shippingInfo && order.shippingInfo.phoneNo}
                                            </span>
                                        </div>
                                        <div>
                                            <p>Address:</p>
                                            <span>
                                                {order.shippingInfo &&
                                                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                            </span>
                                        </div>
                                    </div>

                                    <h2>Payment</h2>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={
                                                    order.paymentInfo &&
                                                        order.paymentInfo.status === "succeeded"
                                                        ? "greenColor"
                                                        : "redColor"
                                                }
                                            >
                                                {order.paymentInfo &&
                                                    order.paymentInfo.status === "succeeded"
                                                    ? "PAID"
                                                    : "NOT PAID"}
                                            </p>
                                        </div>

                                        <div>
                                            <p>Amount:</p>
                                            <span>{order.totalPrice && order.totalPrice}</span>
                                        </div>
                                    </div>

                                    <h2>Order Status</h2>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={
                                                    order.orderStatus && order.orderStatus === "Delivered"
                                                        ? "greenColor"
                                                        : "redColor"
                                                }
                                            >
                                                {order.orderStatus && order.orderStatus}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="confirmCartItems">
                                    <h2>Your Cart Items:</h2>
                                    <div className="confirmCartItemsContainer">
                                        {order.orderItems &&
                                            order.orderItems.map((item) => (
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
                            <div
                                style={{
                                    display: order.orderStatus === "Delivered" ? "none" : "block",
                                }}
                            >
                                <form
                                    className="updateOrderForm"
                                    onSubmit={updateOrderSubmitHandler}
                                >
                                    <h1>Process Order</h1>

                                    <div>

                                        <select onChange={(e) => setStatus(e.target.value)}>
                                            <option value="">Choose Category</option>
                                            {order.orderStatus === "Processing" && (
                                                <option value="Shipped">Shipped</option>
                                            )}

                                            {order.orderStatus === "Shipped" && (
                                                <option value="Delivered">Delivered</option>
                                            )}
                                        </select>
                                    </div>

                                    <button
                                        id="createProductBtn"
                                        type="submit"
                                        disabled={
                                            loading ? true : false || status === "" ? true : false
                                        }
                                    >
                                        Process
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default OrderDetails;