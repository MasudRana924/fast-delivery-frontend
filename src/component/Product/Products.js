import React, { useEffect, useState } from 'react';
import { getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from "react-redux";
import Row from 'react-bootstrap/Row';
import Product from './Product';


const Products = () => {
    const [visible, setVisible] = useState(4);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch])
    const { loading, error, products } = useSelector((state) => state.products);


    const loadMore = () => {
        setVisible(visible + 4);
    };

    return (
        <div>
            <div className="product-section">
                <div className="product-section-header ">
                    <p>All Products</p>
                    <hr />
                </div>
                {
                    products ? <Row md="4" className="mx-auto w-75">
                        {
                            products && products.slice(0, visible).map(product =>
                                (<Product key={product._id} product={product} />)
                            )
                        }
                    </Row> : <p>error</p>
                }
                {visible < products.length && (
                    <button onClick={loadMore} className="load-more-btn">Load More</button>
                )}



            </div>
        </div>
    );
};

export default Products;