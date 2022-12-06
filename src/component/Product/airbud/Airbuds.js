import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Row from 'react-bootstrap/Row';
import Airbud from './Airbud';
import { getProduct } from './../../../actions/productAction';
import airpodBanner from '../../../Images/airpod banner.jpg'

const Airbuds = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch])
    const { loading, error, products } = useSelector((state) => state.products);

    return (
        <>
            <img src={airpodBanner} alt="" className="airpod-banner-img" />
            <div className="mt-3">
                    <div className="product-section-header ">
                        <p>Airpods</p>
                        <hr />
                    </div>
                    {
                        products ? <Row md="4" className="mx-auto w-75">
                            {
                                products.map(product =>
                                    (<Airbud key={product._id} product={product} />)
                                )
                            }

                        </Row> : null
                    }
            </div>
            </>

    );
};

export default Airbuds;