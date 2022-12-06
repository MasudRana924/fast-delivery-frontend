import React from 'react';
import { useSelector } from "react-redux";
import './Profile.css'
import { Link } from 'react-router-dom';

const Profile = () => {
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    return (
        <div >
            {isAuthenticated ? <div className="users-profile-section ">

                <img src={user.avatar.url} alt={user.name} className="user-profile-img " />

                {/* <Link to="/update/profile" className="edit-profile-text text-center">Edit Profile</Link> */}

                <h2 className="user-name-text">{user.name}</h2>
                {/* <h2 className="user-email-text">Email :{user.email}</h2>

                <h2 className="user-email-text">Joined on : {String(user.createdAt).substr(0, 10)}</h2>
                <p className="text-center"> <Link to="/orders"className="text-decoration-none">My Orders</Link>
                    <Link to="/password/update" className="text-decoration-none ms-1"> Change Password</Link></p> */}
               <div className="w-75 mx-auto">
               <Link to="/my/profiles/details"><button className="profile-edit-btn">Profile Details</button></Link>
                <br />
                <Link to="/update/profile"><button className="profile-edit-btn">Edit Profile</button></Link>
                <br />
                <Link to="/change/password"><button className="profile-edit-btn">Change Password</button></Link>
                <br />
                <Link><button className="profile-edit-btn">My Orders</button></Link>
               </div>





            </div> : null}


        </div>
    );
};

export default Profile;