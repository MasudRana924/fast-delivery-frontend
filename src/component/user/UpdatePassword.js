import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from '../../actions/userAction';
import { clearErrors } from './../../actions/productAction';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant';

const UpdatePassword = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const changePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert("Profile Updated Successfully");

            history("/my/profile");

            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }
    }, [dispatch, error, alert, history, isUpdated]);
    return (
        <div className="register-section">
            <Row xs="1" md="3">
                <Col></Col>
                <Col xs="">
                    <div className="signup-card mx-auto">

                        <h2 className='text-dark text-center mt-2'>Change Your Password </h2>

                        <form action="" onSubmit={changePasswordSubmit}>
                            <div className="input-section">

                                <input
                                    type="password"
                                    placeholder="Old Password"
                                    required
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>
                            <div className="input-section">

                                <input
                                    type="password"
                                    placeholder="New Password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>

                            <div className="input-section ">

                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>


                            <div className="signUp-button-section mx-auto w-75 mt-3">
                                <input type="submit"
                                    value="Change" className="signup-btn" />
                            </div>

                        </form>
                    </div>

                </Col>
                <Col></Col>
            </Row>
        </div>
    );
};

export default UpdatePassword;