import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productsReducer, productDetailsReducer, newReviewReducer, newProductReducer, productReducer, productReviewsReducer, reviewReducer } from './reducers/ProductReducer';
import { forgotPasswordReducer, profileReducer, userReducer,allUsersReducer, userDetailsReducer } from "./reducers/userReducer";
import { cartReducer } from './reducers/CartReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer } from "./reducers/OrderReducer";


const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product:productReducer,
  newOrder:newOrderReducer,
  myOrders: myOrdersReducer,
  allOrders: allOrdersReducer,
  orderDetails: orderDetailsReducer,
  allUsers: allUsersReducer,
  userDetails:userDetailsReducer,
  
  review: reviewReducer,
  productReviews: productReviewsReducer,
 
});
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;