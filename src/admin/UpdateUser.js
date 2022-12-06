import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { getUserDetails, updateUser } from './../actions/userAction';
import { clearErrors } from './../actions/OrderAction';
import { UPDATE_USER_RESET } from '../constants/userConstant';
import Sidebar from './Sidebar';
import Loader from './../component/Shared/Loader';

const UpdateUser = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();
    const { loading, error, user } = useSelector((state) => state.userDetails);
  
    const {
      loading: updateLoading,
      error: updateError,
      isUpdated,
    } = useSelector((state) => state.profile);
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    useEffect(() => {
        if (user && user._id !== userId) {
          dispatch(getUserDetails(userId));
        } else {
          setName(user.name);
          setEmail(user.email);
          setRole(user.role);
        }
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (updateError) {
          alert.error(updateError);
          dispatch(clearErrors());
        }
    
        if (isUpdated) {
          alert("User Updated Successfully");
          history("/admin/users");
          dispatch({ type: UPDATE_USER_RESET });
        }
      }, [dispatch, alert, error, history, isUpdated, updateError, user, userId]);
    
      const updateUserSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);
    
        dispatch(updateUser(userId, myForm));
      };
    return (
        <div>
            <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
              
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </button>
            </form>
          )}
        </div>
      </div>
        </div>
    );
};

export default UpdateUser;