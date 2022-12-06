import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Row from 'react-bootstrap/Row';
import { getProduct } from './../../../actions/productAction';
import Headphone from './Headphone';
import headhPhoneBanner from '../../../Images/banner-bullets.jpg'
import Camera from './../camera/Camera';
import cameraBanner from '../../../Images/camera-banner.webp'

const Headphones = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch])
    const { loading, error, products } = useSelector((state) => state.products);
    return (
        <>
            <img src={headhPhoneBanner} alt="" className="airpod-banner-img" />
            <div className="mt-5">
                <div className="product-section">
                    <div className="product-section-header ">
                        <p>Bullet wireless</p>
                        <hr />
                    </div>
                    {
                        products ? <Row md="4" className="mx-auto w-75">
                            {
                                products.map(product =>
                                    (<Headphone key={product._id} product={product} />)
                                )
                            }

                        </Row> : null
                    }
                </div>

            </div>
            <div className="camera-section">
            <img src={cameraBanner} alt="" className="airpod-banner-img" />
                <div className="product-section-header mt-5">
                    <p>Cameras</p>
                    <hr />
                </div>
                {
                    products ? <Row md="4" className="mx-auto w-75">
                        {
                            products.map(product =>
                                (<Camera key={product._id} product={product} />)
                            )
                        }

                    </Row> : null
                }

            </div>
        </>
    );
};

export default Headphones;