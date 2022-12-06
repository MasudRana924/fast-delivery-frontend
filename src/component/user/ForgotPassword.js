import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from './../../actions/userAction';
import { clearErrors } from './../../actions/productAction';

const ForgotPassword = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert(message);
    }
  }, [dispatch, error, alert, message]);
  return (
    <div className="register-section">
      <Row xs="1" md="3">
        <Col></Col>
        <Col xs="">
          <div className="signup-card mx-auto">

            <h2 className='text-dark text-center mt-2'>Change Your Password </h2>

            <form action="" onSubmit={forgotPasswordSubmit}>
              <div className="input-section">

                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>



              <div className="signUp-button-section mx-auto w-75 mt-3">
                <input type="submit"
                  value="Send" className="signup-btn" />
              </div>

            </form>
          </div>

        </Col>
        <Col></Col>
      </Row>
    </div>
  );
};

export default ForgotPassword;