import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Rating from 'react-rating';
import './ProductDetails.css'
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getSingleProductDetails } from '../../../actions/productAction';
import { useParams } from 'react-router-dom';
import shareimg from '../../../Images/Share-icon.png'
import Reviews from './../ReviewPage/Reviews';
import { addItemsToCart } from './../../../actions/CartAction';
import Rating from '@mui/material/Rating';
import { newReview } from './../../../actions/productAction';
import Loader from '../../Shared/Loader';
import { NEW_REVIEW_RESET } from '../../../constants/productConstant';


const ProductDetails = () => {
    const { productId } = useParams();

    const dispatch = useDispatch();
    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );
    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
    );
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const { products } = useSelector((state) => state.products);
    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };
    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
            if (success) {

                dispatch({ type: NEW_REVIEW_RESET });
            }
        }
        dispatch(getSingleProductDetails(productId));
    }, [dispatch, productId])

    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;//product er stock jodi soman hoi tahole tar beshi add hobe na 

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };
    const addToCartHandler = () => {
        dispatch(addItemsToCart(productId, quantity));
        alert("Item Added To Cart");
    };
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", productId);

        dispatch(newReview(myForm));
        alert("Review Submitted Successfully");
    };

    return (
        <>
            {loading ? <Loader></Loader> : <div className="details-container w-75 mx-auto">
                <Row xs="1" md="2">
                    <Col >
                        <div className="image-section">
                            {
                                product.images ? <img src={product.images[0].url} alt="" className="details-img" /> : <p>blank</p>
                            }


                        </div>

                    </Col>
                    <Col>

                        <div className="details-section">
                            <h3 className="text-start">{product.name}</h3>
                            {/* <span className="rating-section">  <Rating
                            initialRating={product.ratings}
                            emptySymbol="far fa-star icon-color"
                            fullSymbol="fas fa-star icon-color"
                            readonly>

                        </Rating> ({product.numOfReviews} Review)</span> */}
                            <span className="rating-section">  <Rating {...options} />({product.numOfReviews} Review)</span>

                            <p className="price-text">Tk 202 <span className="text-danger">(5% off) </span>included all taxes</p>
                            <p className="text-dark text-start fw-bold ms-1">7 days exchange and returns</p>

                            <p>
                                Status:
                                <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                    {product.Stock < 1 ? "OutOfStock" : " InStock"} <span className="text-danger">{product.Stock}</span>
                                </b>
                                
                            </p>
                            <p className="text-dark text-start  ms-1">Select Size</p>
                            <div className="size-btn-section">
                                <button className="size-btn">S</button>  <button className="size-btn">M</button>  <button className="size-btn">L</button> <button className="size-btn">Xl</button>
                            </div>
                        </div>
                        <p className="text-start">Description</p>
                        <p className="text-dark text-start fw-bold ms-1">{product.description}</p>
                        <p className="text-start"></p>
                        <div className="whistle-bag-section mt-5">
                            <button className="whistle-btn">  WISHLIST</button>
                            <button className="bag-btn"> ADD TO BAG</button>
                        </div>
                        <div className="quantity-section mt-3">
                            <button className="btn-quantity" onClick={decreaseQuantity}>-</button>
                            {/* <button className="btn-quantity">1</button> */}
                            <input readOnly type="number" name="1" className="cart-item-no" value={quantity} />
                            <button className="btn-quantity" onClick={increaseQuantity}>+</button>
                        </div>
                        <div className="add-cart-section mt-3">
                            <button className="add-cart-btn" onClick={addToCartHandler}>ADD TO CART</button>
                            <button className="share-btn"><img src={shareimg} alt="" className="share-img" /> share  </button>


                        </div>

                        {
                            user ? <div className="review-section ms-1 mt-5">
                                <p>Write a review</p>
                                <Rating
                                    onChange={(e) => setRating(e.target.value)}
                                    value={rating}
                                />
                                <br />
                                <textarea
                                    className="review-context"
                                    cols="30"
                                    rows="2"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Some text here , thats Amazing !!!"
                                ></textarea>
                                <br />
                                <button className="review-submit-btn" onClick={reviewSubmitHandler}>write review</button>
                            </div> : <div>
                                <p className="ms-3 text-danger mt-3">Please be login to write a review</p>
                            </div>
                        }



                    </Col>

                </Row>



                <div className="mt-5">

                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews &&
                                product.reviews.map((review) => (
                                    <Reviews key={review._id} review={review} />
                                ))}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}
                </div>
            </div>}


        </>
    );
};

export default ProductDetails;