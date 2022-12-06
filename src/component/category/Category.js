import React from 'react';
import './Category.css'
import phone from '../../Images/phone-icon.png'
import laptop from '../../Images/laptop-icon.png'
import headphone from '../../Images/headphone-icon.png'
import airbud from '../../Images/airbud-icon.png'
import camera from '../../Images/camera-icon.png'

const Category = () => {
    return (
        <div className="category-container w-50 mx-auto">
            <p className="text-center text-danger">Categories</p>
            {/* <div className="category-section ">

                <div className="category-card">
                    <button className="category-btn">
                        <img src={phone} alt="" className="btn-img" />
                    </button>
                    <p>PHONE</p>
                </div>

                <div className="category-card">
                    <button className="category-btn">
                        <img src={laptop} alt="" className="btn-img" />
                    </button>
                    <p>LAPTOP</p>
                </div>
                <div className="category-card">
                    <button className="category-btn">
                        <img src={watch} alt="" className="btn-img" />
                    </button>
                    <p>WATCHES</p>
                </div>
                <div className="category-card">
                    <button className="category-btn">
                        <img src={headphone} alt="" className="btn-img" />
                    </button>
                    <p>HEADPHONES</p>
                </div>
                <div className="category-card">
                    <button className="category-btn">
                        <img src={airbud} alt="" className="btn-img" />
                    </button>
                    <p>AIRPODS</p>
                </div>
                <div className="category-card">
                    <button className="category-btn">
                        <img src={camera} alt="" className="btn-img" />
                    </button>
                    <p>CAMERAS</p>
                </div>


            </div> */}
        </div>
    );
};

export default Category;