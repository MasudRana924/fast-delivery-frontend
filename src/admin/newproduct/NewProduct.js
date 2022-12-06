import React from 'react';
import { createProduct } from '../../actions/productAction';
import { NEW_PRODUCT_RESET } from '../../constants/productConstant';
import { clearErrors } from './../../actions/productAction';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import Sidebar from './../Sidebar';
import Button from '@mui/material/Button';
import './Newproduct.css'

const NewProduct = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.newProduct);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [color, setColor] = useState("");
    const [brand, setBrand] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "mobile",
        "cc camera",
        "smart watch",
        "headphone",
        "airpod",
    ];
    const colors = [
        "white",
        "black",
        "red",
        "blue"
    ];
    const brands = [
        "apple",
        "samsung",
        "oppo",
        "vivo",
        "xaomi",
        "realme"
    ];

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert("Product Created Successfully");
            history("/admin/dashboard");
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, alert, error, history, success]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);
        myForm.set("brand", brand);
        myForm.set("color", color);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(createProduct(myForm));
    };

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <div>
            <h1>Create Product</h1>
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Create Product</h1>

                        <div>

                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>

                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div>


                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>

                            <select onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>

                            <select onChange={(e) => setBrand(e.target.value)}>
                                <option value="">Choose Brand</option>
                                {brands.map((brand) => (
                                    <option key={brand} value={brand}>
                                        {brand}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>

                            <select onChange={(e) => setColor(e.target.value)}>
                                <option value="">Choose Category</option>
                                {colors.map((color) => (
                                    <option key={color} value={color}>
                                        {color}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>

                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={createProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewProduct;