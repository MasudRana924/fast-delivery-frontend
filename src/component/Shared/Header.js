import React, { useState } from 'react';
import './Header.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../actions/userAction';
import dashImg from '../../Images/dashborad.png'
import profileImg from '../../Images/us-profile.png'
import ordersImg from '../../Images/orders.png'
import logoutImg from '../../Images/logout.png'
import topBanner from '../../Images/top-banner.webp'
import cartIcon from '../../Images/icons8-shopping-cart-100.png'
import heartIcon from '../../Images/icons8-heart-100.png'
import CartItems from './../Cart/CartItems';


const Header = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const { cartItems } = useSelector((state) => state.cart);
    const [keyword, setKeyword] = useState("");
    const history = useNavigate();
    const searchSubmitHandler = (e) => {
        console.log(keyword)

        if (keyword.trim()) {
            history(`/products/${keyword}`);
        } else {
            // history('/products')
            alert("Please search something")
        }
        e.preventDefault();
    };

    const logOut = () => {
        dispatch(logout());
        alert("Logout Successfully");
        history("/login")
    }

    return (
        <div >
            <div className="top-banner">
                <img src={topBanner} className="top-banner-img" alt="" />
            </div>

            <div className="header">
                <div className="left-header">
                    <Link to="/" className="text-decoration-none"><h1 className="title" >fastDeliver</h1></Link>
                </div>
                <div className="search-section">
                    <form action="" onSubmit={searchSubmitHandler}>
                        <input type="text" className="search" placeholder="Find Your Choice..." onChange={(e) => setKeyword(e.target.value)} />
                        {/* <button className="search-btn" >search</button> */}
                        <input type="submit" value="SEARCH" className="search-btn" />
                    </form>


                </div>
                <div className="right-header">
                    <div className="wish-list-part">
                        <Link to="/products" className="text-decoration-none">
                            <span><img src={heartIcon} alt="" /></span>
                        </Link>
                    </div>

                    <div className="cart-part">
                        <Link to="/cart" className="text-decoration-none">
                            <span><img src={cartIcon} alt="" /> <p>{cartItems.length}</p></span>

                        </Link>

                    </div>

                    {

                        isAuthenticated ? <div>
                            <div className="user-nav-section">
                                <Link to="/my/profile">
                                    <img src={user.avatar.url ? user.avatar.url : "/Profile.png"} alt="Profile" className="user-profile" />
                                </Link>



                                <div className="user-dropdown">
                                    {
                                        user.role === "admin" && <p className="mt-3"> <img src={dashImg} alt="" className="user-drop-image ms-5" /> <Link to="/admin/dashboard" className="user-link">Dashboard</Link></p>
                                    }
                                    <p><img src={profileImg} alt="" className="user-drop-image ms-5" /> <Link to="/my/profile" className="user-link">Profile</Link></p>
                                    <p><img src={ordersImg} alt="" className="user-drop-image ms-5" /><Link to="/orders" className="user-link">Orders</Link></p>

                                    <div className="log-out-btn-section">
                                        <img src={logoutImg} alt="" className="user-drop-image ms-5" />    <button className="logout-btn" onClick={logOut}>LogOut</button>
                                    </div>

                                </div>
                            </div>

                        </div> : <div className="ms-5">
                            <Link to="/register"><button className="my-btn ">My Acoount</button></Link>

                        </div>
                    }
                </div>
            </div>



        </div>
    );
};

export default Header;