import React from 'react';
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, deleteUser, getAllUsers } from './../../actions/userAction';
import { useEffect } from 'react';
import { DELETE_USER_RESET } from '../../constants/userConstant';
import { useNavigate, Link } from 'react-router-dom';
import './UserList.css'
import editImg from '../../Images/icons8-pencil-24.png'
import delImg from '../../Images/icons8-trash-can-48.png'

const UserList = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { error, users } = useSelector((state) => state.allUsers);
    console.log("users", users);
    const {
        error: deleteError,
        isDeleted,
        message,
    } = useSelector((state) => state.profile);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    };

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert(message);
            history("/admin/users");
            dispatch({ type: DELETE_USER_RESET });
        }

        dispatch(getAllUsers());
    }, [dispatch, alert, error, deleteError, history, isDeleted, message]);
    return (
        <div className="w-75 mx-auto mt-5">
            <Table striped bordered hover>
                <thead>
                    <tr>

                        <th>Images</th>
                        <th>Name</th>
                        <th>email</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>

                    {
                        users &&
                        users.map(user => (
                            <tr>
                                <img src={user.avatar.url} alt="" className="user-images" />
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>
                                    <Link to={`/admin/user/${user._id}`} className=" text-decoration-none text-dark">
                                        <img src={editImg} alt="" className="edit-del-icon" />
                                    </Link>
                                    {/* <Link to={`/admin/user/${user._id}`} className=" text-decoration-none text-dark ms-1">
                                            <img src={delImg} alt="" className="edit-del-icon ms-3" />
                                         
                                        </Link> */}
                                    <button onClick={() =>
                                        deleteUserHandler(user._id)
                                    }>delete</button>
                                </td>

                            </tr>
                        ))
                    }

                </tbody>
            </Table>


        </div>
    );
};

export default UserList;