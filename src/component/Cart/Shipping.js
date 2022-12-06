import React, { useState, Fragment } from 'react';
import './Shipping.css'
import { useSelector, useDispatch } from 'react-redux';
import { saveShippingInfo } from './../../actions/CartAction';
import { useNavigate } from 'react-router-dom';
import { Country, State } from "country-state-city";
import homeIcon from '../../Images/icons8-house-with-garden-48.png'
import cityIcon from '../../Images/icons8-city-48.png'
import pinIcon from '../../Images/icons8-pin-code-48.png'
import phoneIcon from '../../Images/icons8-phone-64.png'
import countryIcon from '../../Images/icons8-country-48.png'
import cartIcon from '../../Images/icons8-add-shopping-cart-50.png'
import shippingIcon from '../../Images/icons8-document-delivery-48.png'
import confirmIcon from '../../Images/icons8-verified-account-50.png'
import paymentIcon from '../../Images/icons8-payment-64.png'

const Shipping = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 10) {
            alert("Phone Number should be 10 digits Long");
            return;
        }
        dispatch(
            saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
        );
        history("/order/confirm");
    };



    return (
        <Fragment>
            <div className="stepper-section">
            <div className="stepper w-50 mx-auto mt-5">
                <div className="stepper-details">
                    <img src={cartIcon} alt="" className="stepper-img" />
                    <p className="ms-3">Cart</p>
                </div>
                <hr  />
                <div className="stepper-details">
                    <img src={shippingIcon} alt="" className="stepper-img" />
                    <p>Shipping</p>
                </div>

                <hr className="shipping-hr" />
                <div className="stepper-details">
                    <img src={confirmIcon} alt="" className="stepper-img" />
                    <p>Confirm</p>
                </div>

                <hr />
                <div className="stepper-details">
                    <img src={paymentIcon} alt="" className="stepper-img" />
                    <p>Payment</p>
                </div>


            </div>
            </div>
            <div>

                <div className="shippingContainer">

                    <div className="shippingBox">
                        <h2 className="shippingHeading">Shipping Details</h2>

                        <form
                            className="shippingForm"
                            encType="multipart/form-data"
                            onSubmit={shippingSubmit}
                        >
                            <div>
                                <img src={homeIcon} alt="" className="shipping-section-icon" />
                                <input
                                    type="text"
                                    placeholder="Address"
                                    required
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>

                            <div>
                                <img src={cityIcon} alt="" className="shipping-section-icon" />
                                <input
                                    type="text"
                                    placeholder="City"
                                    required
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>

                            <div>
                                <img src={pinIcon} alt="" className="shipping-section-icon" />
                                <input
                                    type="number"
                                    placeholder="Pin Code"
                                    required
                                    value={pinCode}
                                    onChange={(e) => setPinCode(e.target.value)}
                                />
                            </div>

                            <div>
                                <img src={phoneIcon} alt="" className="shipping-section-icon" />
                                <input
                                    type="number"
                                    placeholder="Phone Number"
                                    required
                                    value={phoneNo}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                    size="10"
                                />
                            </div>

                            <div>

                                <img src={countryIcon} alt="" className="shipping-section-icon" />
                                <select
                                    required
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                >
                                    <option value="">Country</option>
                                    {Country &&
                                        Country.getAllCountries().map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            {country && (
                                <div>

                                    <img src={homeIcon} alt="" className="shipping-section-icon" />
                                    <select
                                        required
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                    >
                                        <option value="">State</option>
                                        {State &&
                                            State.getStatesOfCountry(country).map((item) => (
                                                <option key={item.isoCode} value={item.isoCode}>
                                                    {item.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            )}

                            <input
                                type="submit"
                                value="Continue"
                                className="shippingBtn"

                            />
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Shipping;