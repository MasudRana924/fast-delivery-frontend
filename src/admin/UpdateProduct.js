import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { clearErrors, getSingleProductDetails } from '../actions/productAction';
import { UPDATE_PRODUCT_RESET } from '../constants/productConstant';
import { useNavigate, useParams } from 'react-router-dom';
import { updateProduct } from './../actions/productAction';
import Button from '@mui/material/Button';
import Sidebar from './Sidebar';

const UpdateProduct = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { productId } = useParams();

    const { error, product } = useSelector((state) => state.productDetails);

    const {
        loading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.product);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [color, setColor] = useState("");
    const [brand, setBrand] = useState("");
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
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
        if (product && product._id !== productId) {
            dispatch(getSingleProductDetails(productId));
        } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setBrand(product.brand);
            setColor(product.color);
            setStock(product.Stock);
            setOldImages(product.images);
        }
        if (error) {
            alert(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert("Product Updated Successfully");
            history("/admin/products");
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [
        dispatch,
        alert,
        error,
        history,
        isUpdated,
        productId,
        product,
        updateError,
    ]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("brand", brand);
        myForm.set("color", color);
        myForm.set("Stock", Stock);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(updateProduct(productId, myForm));
    };

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

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
                        onSubmit={updateProductSubmitHandler}
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
                                value={price}
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

                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option >Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>

                            <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                                <option value="">Choose Brand</option>
                                {brands.map((brand) => (
                                    <option key={brand} value={brand}>
                                        {brand}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>

                            <select value={color} onChange={(e) => setColor(e.target.value)}>
                                <option value="">Choose Color</option>
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
                                value={Stock}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image.url} alt="Product Preview" />
                            ))}
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;