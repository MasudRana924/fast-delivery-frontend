import Header from "./component/Shared/Header";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Footer from "./component/Shared/Footer";
import Home from "./component/Home/Home";
import ProductDetails from './component/Home/ProductDetails/ProductDetails';
import AllProducts from "./component/Home/AllProducts/AllProducts";
import Signup from './component/Register-Login/Signup';
import Login from './component/Register-Login/Login';
import { useEffect, useState } from "react";
import store from './store'
import { loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import Profile from './component/user/Profile';
import UserUpdateProfile from './component/user/UserUpdateProfile';
import UpdatePassword from './component/user/UpdatePassword';
import ForgotPassword from './component/user/ForgotPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import { axios } from 'axios';
import Payment from './component/Cart/Payment';
import Dashbord from './admin/Dashbord';
import ProtectedRoute from './component/protected/ProtectedRoute';
import ProductList from "./admin/ProductList";
import NewProduct from './admin/newproduct/NewProduct';
import UpdateProduct from './admin/UpdateProduct';
import MyOrders from './component/Cart/MyOrders';
import UserList from "./component/user/UserList";
import AllOrderList from './admin/AllOrderList';
import OrderDetails from './admin/OrderDetails';
import UpdateUser from './admin/UpdateUser';
import ProductReviews from "./admin/ProductReviews";

function App() {
  const [loading, setLoading] = useState(true);
  const spinner = document.getElementById("spinner");
  if (spinner) {
    setTimeout(() => {
      spinner.style.display = "none";
      setLoading(false);
    }, 2000);
  }
  useEffect(() => {

    store.dispatch(loadUser());
  }, []);
  const { isAuthenticated, user } = useSelector((state) => state.user);


  return (

    !loading && <BrowserRouter>
      <Header />
      {/* login hoile user details dekhaibe  */}
      {/* {isAuthenticated && <User user={user} />} */}
    
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:productId" element={<ProductDetails />} />
        <Route exact path="/products" element={<AllProducts />} />
        <Route path="/products/:keyword" element={<AllProducts />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my/profile" element={<Profile />} />
        <Route path="/update/profile" element={<UserUpdateProfile />} />
        <Route path="/change/password" element={<UpdatePassword />} />
        <Route path="/fogot/password" element={<ForgotPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login/shipping" element={<Shipping />} />
        <Route path="/order/confirm" element={<ConfirmOrder />} />
        <Route path="/process/payment" element={<Payment />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/admin/dashboard" element={<Dashbord />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/orders" element={<AllOrderList />} />
        <Route path="/admin/order/:orderId" element={<OrderDetails />} />
        <Route path="/admin/product" element={<NewProduct />} />
        <Route path="/admin/product/:productId" element={<UpdateProduct />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/admin/user/:userId" element={<UpdateUser />} />
        <Route path="/admin/reviews" element={<ProductReviews />} />
        {/* <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashbord}
        /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
