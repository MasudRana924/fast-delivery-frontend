import React, { useState } from 'react';
import './Signup.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link, useNavigate } from 'react-router-dom';
import userIcon from '../../Images/avatar.png'
import emailIcon from '../../Images/email.png'
import passIcon from '../../Images/padlock.png'
import './Signup.css'
import { useDispatch, } from "react-redux";
import { register } from './../../actions/userAction';



const Signup = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;
    const [avatar, setAvatar] = useState("/Profile.png");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
        alert("user create successfully")
        history('/')
    };
    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    return (
        <div className="register-section">
            <Row xs="1" md="3">
                <Col></Col>
                <Col xs="">
                    <div className="signup-card mx-auto">

                        <h2 className='text-dark text-center mt-2'>Please Register</h2>

                        <form action="" onSubmit={registerSubmit}>
                            <div className="input-section">
                                <img src={userIcon} alt="" className="register-user-icon" />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={registerDataChange}
                                />
                            </div>

                            <div className="input-section ">
                                <img src={emailIcon} alt="" className="register-user-icon" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className="input-section">
                                <img src={passIcon} alt="" className="register-user-icon" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    name="password"
                                    value={password}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className="img-input-section">
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className="signUp-button-section mx-auto w-75 mt-3">
                                <input type="submit" value="Register" className="signup-btn" />
                            </div>
                            <p className="text-center mt-1">Already have an account? <Link to="/login" className='text-primary pe-auto text-decoration-none' >Please Login</Link> </p>
                        </form>
                    </div>

                </Col>
                <Col></Col>
            </Row>
        </div>
    );
};

export default Signup;