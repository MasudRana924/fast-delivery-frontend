import React from 'react';
import Rating from 'react-rating';
import profilePng from '../../../Images/user-image-icon.jpg'
import './reviews.css'

const Reviews = ({ review }) => {
    return (
        <div className="review-card">
            <div className="review-img-section">
                <img src={profilePng} alt="User" className="user-img-review" />
            </div>
            <div className="review-details">
                <p>{review.name}</p>
                <div className="review-star">
                    <Rating
                        initialRating={review.rating}
                        emptySymbol="far fa-star review-icon-color"
                        fullSymbol="fas fa-star review-icon-color"
                        readonly>

                    </Rating>
                </div>
                <span className="reviewCardComment">{review.comment}</span>
            </div>

        </div>
    );
};

export default Reviews;