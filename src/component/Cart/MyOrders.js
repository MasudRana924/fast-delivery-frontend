import React from 'react';
import { Fragment } from 'react';
import { Typography } from '@mui/material';
import Loader from './../Shared/Loader';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { clearErrors, myOrders } from './../../actions/OrderAction';
import './MyOrder.css'
import Table from 'react-bootstrap/Table';
import MyAllOrders from './MyAllOrders';
const MyOrders = () => {
    const dispatch = useDispatch();
    // const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);
    const myOrderList = useSelector(state => state.myOrders)
    const { loading, error, orders } = myOrderList
    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    }, [dispatch, error]);
   
     
    return (
        <Fragment>


            {loading ? (
                <Loader />
            ) : (
                <div className="myOrders-section w-75 mx-auto">
                    <h4 className="order-hader">{user.name}'s Orders</h4>

                    {/* <Table striped bordered hover>
                        <thead>
                            <tr>

                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Product Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders &&
                                orders.forEach(order =>
                                    <tr className="">
                                        <td>order._id</td>
                                        <td></td>

                                    </tr>
                                )}

                        </tbody>
                    </Table> */}
                    {
                        orders &&
                        orders.forEach(order =>
                            <p>{order._id}</p>
                        )}

                </div>
            )}
        </Fragment>
    );
};

export default MyOrders;