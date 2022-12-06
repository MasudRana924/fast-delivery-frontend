import React, { useEffect } from 'react';
import './productList.css'
import Sidebar from './Sidebar';
import { useSelector, useDispatch } from "react-redux";
import Row from 'react-bootstrap/Row';
import AdminProducts from './adminproducts/AdminProducts';
import { getProduct } from './../actions/productAction';

const ProductList = () => {
    const dispatch = useDispatch();
     
    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch])
    const { error, products } = useSelector((state) => state.products);
    return (
        <>
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>
                    <Row md="4" className="mx-auto ">
                        {
                            products && products.map(product => (<AdminProducts key={product._id} product={product} />)

                            )
                        }
                    </Row>

                </div>
            </div>
        </>
    );
};

export default ProductList;