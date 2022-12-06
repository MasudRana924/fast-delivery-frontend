import React from 'react';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';
import Rating from 'react-rating';
import editicon from '../../Images/edit.png'
import removeicon from '../../Images/delete (1).png'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, deleteProduct } from '../../actions/productAction';
import { Button } from '@mui/material/Button';
import { useEffect } from 'react';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstant';
import { getAdminProduct } from './../../actions/productAction';

const AdminProducts = ({ product }) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

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
      alert("Product Deleted Successfully");
      history("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, deleteError, history, isDeleted]);
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  return (
    <Col className="mt-3 mx-auto">

      <div className="productCard">
        <Link to={`/product/${product._id}`} className=" text-decoration-none text-dark">
          <img src={product.images[0].url} alt="" className="product-image" />
          <div className="product-container">

            <h1>{product.name}</h1>
            <p>Price : {product.price}</p>
            <Rating
              initialRating={product.ratings}
              emptySymbol="far fa-star icon-color"
              fullSymbol="fas fa-star icon-color"
              readonly></Rating>({product.numOfReviews} reviews)
            <p>Instock : {product.Stock}</p>
          </div>
          <div className="edit-del">
            <Link to={`/admin/product/${product._id}`}>
            <img src={editicon} alt="" className="edit-del-icon" />
            </Link>
            {/* <img src={removeicon} alt="" className="edit-del-icon" /> */}
            <button onClick={() =>
              deleteProductHandler(product._id)
            } className="delete-btn"> <img src={removeicon} alt="" className="edit-del-icon" /> </button>
          </div>



        </Link>


      </div>


    </Col>
  );
};

export default AdminProducts;