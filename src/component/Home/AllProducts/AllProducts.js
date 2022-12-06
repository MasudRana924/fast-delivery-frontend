import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './AllProducts.css'
import { useParams } from 'react-router-dom';
import { getProduct } from './../../../actions/productAction';
import Product from './../../Product/Product';
import arrow from '../../../Images/down-arrow (2).png';
import arrowIcon from '../../../Images/right-arrow.png';
const categories = [
    
    "mobile",
    "cc camera",
    "smart watch",
    "monitor",
    "headphone",

];
const colors = [
    "white",
    "red",
    "black",
    "blue"
];
const brands = [
    "apple",
    "samsung",
    "oppo",
    "xaomi",
    "vivo",
    "realme"

];

const AllProducts = () => {
    const dispatch = useDispatch();
    const { keyword } = useParams();
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [color, setColor] = useState("");
    const [brand, setBrand] = useState("");
    const { loading, error, products } = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(getProduct(keyword, category, color, brand));
    }, [dispatch, keyword, category, color, brand])
    //price filter
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };
    const refreshPage = () => {
        window.location.reload();
    }

    return (
        <div className="all-products-section">
            <Row md="2">
                <Col md="3" className="filter-container mt-3" >
                    <div className="filter-section mx-auto w-75">
                        <div className="filter-icon-sec">
                            <p className="filter-title">CATEGORIES</p>
                            <img src={arrow} alt="" className="filter-img" />

                        </div>
                        <hr />
                        {/* <div className="price-filter mx-auto w-75 mt-3">
                            <p>Price : </p>
                            <input type="range" className="form-range" min="0" max="25000" step="0.5" id="customRange3" />
                        </div> */}
                        <div className="category-list">
                            <ul >
                                {categories.map((category) => (
                                    <li
                                        className="category-link"
                                        key={category}
                                        onClick={() => setCategory(category)}
                                    >
                                        <img src={arrowIcon} alt="" className="arrow-icon" /> {category}


                                    </li>
                                ))}
                            </ul>
                        </div>



                        <div className="color-filter">
                            <div className="filter-icon-sec">
                                <p className="filter-title">COLORS</p>
                                <img src={arrow} alt="" className="filter-img" />
                            </div>
                            <hr />
                            {colors.map((color) => (
                                <button onClick={() => setColor(color)} className="color-btn">{color} </button>
                            ))}

                        </div>

                        {/* <button className="search-refresh-btn" type="submit" onClick={refreshPage}> Refresh</button> */}


                        <div className="brand-list">
                            <div className="filter-icon-sec">
                                <p className="filter-title">BRANDS</p>
                                <img src={arrow} alt="" className="filter-img" />
                            </div>
                            <hr />
                            <ul >
                                {brands.map((brand) => (
                                    <li
                                        className="category-link"
                                        key={brand}
                                        onClick={() => setBrand(brand)}
                                    >
                                        <img src={arrowIcon} alt="" className="arrow-icon" /> {brand}


                                    </li>
                                ))}
                            </ul>
                        </div>


                    </div>
                </Col>
                <Col md="9" className="mx-auto">
                    <div className="product-section">
                        <Row md="4" className="mx-auto ">
                            {
                                products && products.map(product =>
                                    (<Product key={product._id} product={product} />)
                                )
                            }
                        </Row>
                    </div>
                </Col>
            </Row>


        </div>
    );
};

export default AllProducts;