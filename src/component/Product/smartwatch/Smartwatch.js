import React from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Rating from 'react-rating';

const Smartwatch = ({ product }) => {
    return (
        <>
            {
                product.category === "smart watch" ? <Col className="mt-3 ">
                    <Link to={`/product/${product._id}`} className=" text-decoration-none text-dark">
                        <button className="category-title">{product.category}</button>
                        <img src={product.images[0].url} alt="" className="product-image" />
                        <div className="product-container">

                            <h1>{product.name}</h1>
                            <p>{product.price}TK</p>
                            <Rating
                                initialRating={product.ratings}
                                emptySymbol="far fa-star icon-color"
                                fullSymbol="fas fa-star icon-color"
                                readonly></Rating>({product.numOfReviews} reviews)
                            <br />
                            <span>Instock : {product.Stock}</span>
                        </div>
                    </Link>

                </Col> : null
            }
        </>

    );
};

export default Smartwatch;