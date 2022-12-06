import React from 'react';
import banner from"../../Images/camera.webp"
import phone from"../../Images/phone.webp"
import laptop from"../../Images/laptop.jpg"
import watch from"../../Images/watch.webp"
import airbud from"../../Images/airbud.webp"
import './Banner.css'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

const Banner = () => {
    return (
        <div className="banner-section">

            <Row md="3">
               <Col md="3">
               <img src={phone} alt="" className="side-banner-images "/>
                <img src={laptop} alt="" className="side-banner-images "/>
               </Col>
               <Col md="6">
                <p className="banner-title">If you can see it, you can shoot it</p>
               <img src={banner} alt="" className="banner-images "/>
               
               </Col>
               <Col md="3">
               <img src={watch} alt="" className="side-banner-images "/>
                <img src={airbud} alt="" className="side-banner-images "/>

               </Col>
            </Row>
            
        </div>
    );
};

export default Banner;