import React, { useEffect, useState } from 'react';
import { Link,useLocation,useNavigate} from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import emailIcon from '../../Images/email.png'
import passIcon from '../../Images/padlock.png'
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../actions/userAction';
import { clearErrors } from './../../actions/productAction';
const Login = () => {
    const dispatch = useDispatch();
    const history=useNavigate();
    const location=useLocation();
    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
    );
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    };
    const redirect = location.search ? location.search.split("=")[1] : "/my/profile";
    
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

    return (
        <div className="register-section">
            <Row xs="1" md="3">
                <Col></Col>
                <Col xs="">
                    <div className="signup-card mx-auto">

                        <h2 className='text-dark text-center mt-2'>Please Login</h2>
                        {/* <Form className="w-75 mx-auto mt-3"  >
                     
                        <Form.Group className="form-input-section" >
                            <p className="text-start text-dark">Email</p>
                            <div className="icon-input">
                                <img src={emailIcon} alt="" className="register-user-icon" />  <Form.Control type="email" placeholder="Enter Your Email" />
                            </div>

                        </Form.Group>
                        <Form.Group className="form-input-section" >
                            <p className="text-start text-dark">Password</p>
                            <div className="icon-input">
                                <img src={passIcon} alt="" className="register-user-icon" /> <Form.Control type="password" placeholder="Enter a Password" />
                            </div>


                        </Form.Group>
                       
                        <p className="text-start text-danger"></p>
                        <Link to="/resetpassword" className="text-decoration-none text-start "><p className="ms-1">Forget Password?</p></Link>
                        <Button type="submit" className="w-100 text-center fs-6 signup-btn mt-1" size="sm" variant="dark">
                            Log-in
                        </Button>
                        <p className="mt-1">New to Deliver.fast? <Link to="/register" className='text-primary pe-auto text-decoration-none' >Please Signup</Link> </p>

                    </Form> */}
                        <form action="" onSubmit={loginSubmit} className="mt-5">
                            <div className="input-section">
                                <img src={emailIcon} alt="" className="register-user-icon" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-section">
                                <img src={passIcon} alt="" className="register-user-icon" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                />
                            </div>

                            <div className="signUp-button-section mx-auto w-75 mt-3">
                                <Link to="/fogot/password" className="text-decoration-none text-start  "><p className=" text-start">Forget Password?</p></Link>
                                <input type="submit" value="Login" className="signup-btn" />
                                <p className="mt-3">New to Deliver.fast? <Link to="/register" className='text-primary pe-auto text-decoration-none' >Please Signup</Link> </p>
                            </div>


                        </form>
                    </div>

                </Col>
                <Col></Col>
            </Row>
        </div>
    );
};

export default Login;