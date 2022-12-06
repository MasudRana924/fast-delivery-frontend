import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import './Services.css'

const Services = () => {
    return (
        <div className="services-section w-50 mx-auto">

            <Row md="3">
                <Col md="4">
                    <div className="services-card">
                        <p>Super Fast & Free Delivery</p>
                    </div>
                </Col>
                <Col md="4">
                    <h3 className="services-title">Services</h3>
                    <div className="services-card-two">
                        <p>Authentic Product</p>
                    </div>
                    <div className="services-card-three">
                        <p>Money Back Guaranteed</p>
                    </div>
                </Col>
                <Col md="4">
                    <div className="services-card-four">
                        <p>Cash On Delivery System</p>
                    </div>
                </Col>
            </Row>

        </div>
    );
};

export default Services;