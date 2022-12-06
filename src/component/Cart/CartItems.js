import React from 'react';
import { Link } from 'react-router-dom';
import './CartItems.css'

const CartItems = ({ item, deleteCartItems }) => {
    return (
        <div className="cart-items-card">
            <img src={item.image} alt="" className="cart-item-img" />
            <div className="cart-items-details">
                <Link to={`/product/${item.product}`} className="cart-items-link">{item.name}</Link>
                <br />
                <span className="cart-items-price">{`Price: ₹${item.price}`}</span>
                <p onClick={() => deleteCartItems(item.product)} className="cart-itmes-remove-btn">Remove</p>
            </div>
        </div>
    );
};

export default CartItems;