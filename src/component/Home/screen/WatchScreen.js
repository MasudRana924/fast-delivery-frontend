import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import './WatchScreen.css'
import watch from '../../../Images/watch-offer.png'
import airbud from '../../../Images/airbud-offer.png'
import camera from '../../../Images/camera-offer.png'
const WatchScreen = () => {
    return (
        <div className="watchscreen-container">
            <Row md="2">
                <Col md="4">
                    <div className="watch-sections ">
                        <div className="watch-sections-info">
                            <h5>Havit HV-M9013</h5>
                            <h6>IP67 Waterproof Rating</h6>
                            <h6>24 Hours Heart Rate Detection</h6>
                            <h6>now at <p>2300TK</p> </h6>
                        </div>

                        <img src={watch} alt="" className="watch-offer-img img-fluid" />
                    </div>
                </Col>
                <Col md="4">
                        <div className="camera-sections ">
                            <div className="watch-sections-info">
                                <h5>Havit HV-M9013</h5>
                                <h6>IP67 Waterproof Rating</h6>
                                <h6>24 Hours Heart Rate Detection</h6>
                                <h6>now at <p>2300TK</p> </h6>
                            </div>

                            <img src={camera} alt="" className="watch-offer-img img-fluid" />
                        </div>
                </Col>
                <Col md="4">
                        <div className="airbud-sections ">
                            <div className="watch-sections-info">
                                <h5>Joyroom JR-T04s</h5>
                                <h6>IP67 Waterproof Rating</h6>
                                <h6>Intelligent Noise Reduction</h6>
                                <h6>now at <p>1000TK</p> </h6>
                            </div>

                            <img src={airbud} alt="" className="watch-offer-img img-fluid" />
                        </div>
                </Col>
            </Row>

        </div>
    );
};

export default WatchScreen;