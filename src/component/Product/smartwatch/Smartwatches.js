import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Row from 'react-bootstrap/Row';
import { getProduct } from './../../../actions/productAction';
import smartWatch from '../../../Images/smart-banner.webp'
import Smartwatch from './Smartwatch';
const Smartwatches = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch])
    const { loading, error, products } = useSelector((state) => state.products);
    return (
        <>
            <img src={smartWatch} alt="" className="airpod-banner-img" />
            <div className="mt-5">
                <div className="product-section-header ">
                    <p>Smart watches</p>
                    <hr />
                </div>
                {
                    products ? <Row md="4" className="mx-auto w-75">
                        {
                            products.map(product =>
                                (<Smartwatch key={product._id} product={product} />)
                            )
                        }

                    </Row> : null
                }
            </div>

        </>
    );
};

export default Smartwatches;