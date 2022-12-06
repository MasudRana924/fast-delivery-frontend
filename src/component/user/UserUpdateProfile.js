import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, loadUser } from './../../actions/userAction';
import { clearErrors } from './../../actions/productAction';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant';
import './UpdateProfile.css'

const UserUpdateProfile = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { error, isUpdated } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
    };

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (user === true) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert("Profile Updated Successfully");
            dispatch(loadUser());

            history("/my/profile");

            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [dispatch, error, alert, user, isUpdated]);
    return (
        <div className="register-section">
            <Row xs="1" md="3">
                <Col></Col>
                <Col xs="">
                    <div className="signup-card mx-auto">

                        <h2 className='text-dark text-center mt-2'>Update Your Profile </h2>

                        <form action="" onSubmit={updateProfileSubmit}>
                            <div className="input-section">

                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="input-section ">

                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="img-input-section d-flex">
                                <img src={avatarPreview} alt="Avatar Preview" className="user-update-profile-img " />
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={updateProfileDataChange}
                                    className="mt-5 ms-3"
                                />
                            </div>
                            <div className="signUp-button-section mx-auto w-75">
                                <input type="submit" value="Update" className="signup-btn" />
                            </div>

                        </form>
                    </div>

                </Col>
                <Col></Col>
            </Row>
        </div>
    );
};

export default UserUpdateProfile;