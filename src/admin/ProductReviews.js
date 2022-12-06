import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { deleteReviews, getAllReviews } from './../actions/productAction';
import { useEffect } from 'react';
import { clearErrors } from './../actions/OrderAction';
import { useNavigate } from 'react-router-dom';
import { DELETE_REVIEW_RESET } from './../constants/productConstant';
import Table from 'react-bootstrap/Table';
import Sidebar from './Sidebar';
import './ProductReview.css'

const ProductReviews = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.review
    );

    const { error, reviews, loading } = useSelector(
        (state) => state.productReviews
    );
    console.log(reviews);

    const [productId, setProductId] = useState("");

    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReviews(reviewId, productId));
    };

    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId));
    };

    useEffect(() => {
        if (productId.length === 2) {
            dispatch(getAllReviews(productId));
        }
        if (error) {
            alert(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert("Review Deleted Successfully");
            history("/admin/reviews");
            dispatch({ type: DELETE_REVIEW_RESET });
        }
    }, [dispatch, alert, error, deleteError, history, isDeleted, productId]);
    return (
        <div className="w-75 mx-auto mt-5 dashboard">
            <Sidebar></Sidebar>
            <div className="productReviewsContainer">
                <form
                    className="productReviewsForm"
                    onSubmit={productReviewsSubmitHandler}
                >
                    <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

                    <div>

                        <input
                            type="text"
                            placeholder="Product Id"
                            required
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                        />
                    </div>

                    <button
                        id="createProductBtn"
                        type="submit"
                        disabled={
                            loading ? true : false || productId === "" ? true : false
                        }
                    >
                        Search
                    </button>
                </form>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>comment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            reviews && reviews.length > 0 &&
                            reviews.map(review => (
                                <tr>
                                    <td>{review._id}</td>
                                    <td>{review.name}</td>

                                    <td>{review.comment}</td>
                                    <td>
                                        <button onClick={() =>
                                            deleteReviewHandler(review._id)
                                        }>delete</button>
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ProductReviews;