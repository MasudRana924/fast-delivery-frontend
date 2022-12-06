import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteOrder, clearErrors, getAllOrders } from './../actions/OrderAction';
import { useEffect, Fragment } from 'react';
import { DELETE_ORDER_RESET } from '../constants/OrderConstant';
import { useNavigate, Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import editImg from '../../src/Images/icons8-pencil-24.png'
import delImg from '../../src/Images/icons8-trash-can-48.png'
import { DataGrid } from '@mui/x-data-grid';
import Sidebar from './Sidebar';
const AllOrderList = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const { orders } = useSelector((state) => state.allOrders);
    console.log(orders);
    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch, alert, history]);
   

    return (
        <>

            <div className="dashboard-allOrder">
                <Sidebar />
                <Table striped bordered hover>
                    <thead >
                        <tr >

                            <th>Id</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders &&
                            orders.map(order => (
                                <tr>
                                    <td>{order._id}</td>
                                    <td>{order.orderItems.length}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.orderStatus}</td>
                                    <td>
                                        <Link to={`/admin/order/${order._id}`} className=" text-decoration-none text-dark">
                                            <img src={editImg} alt="" className="edit-del-icon" />
                                        </Link>
                                        <Link to={`/admin/order/${order._id}`} className=" text-decoration-none text-dark ms-1">
                                            <img src={delImg} alt="" className="edit-del-icon ms-3" />
                                            {/* <button ></button> */}
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </>

        // <>
        //     <DataGrid

        //         rows={rows}
        //         columns={columns}
        //         pageSize={10}
        //         disableSelectionOnClick
        //         className="productListTable"
        //         autoHeight
        //     />
        // </>

    );
};

export default AllOrderList;