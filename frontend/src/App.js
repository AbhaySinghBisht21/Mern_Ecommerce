import "./App.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Header from "./components/layout/Header/Header.js";
import WebFont from "webfontloader";
import React, { useEffect, useState } from "react";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails.js";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import LoginSignUp from "./components/User/LoginSignUp";
import { loadUser } from "./actions/userAction";
import store from "./store";
import UserOption from "./components/layout/Header/UserOption.js";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./components/User/Profile.js";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/UpdatePassword.js";
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js";
import Cart from "./components/Cart/Cart.js";
import Shipping from "./components/Cart/Shipping.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import Payment from "./components/Cart/Payment.js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PrivateRoute from "./components/Route/PrivateRoute";
import OrderSuccess from "./components/Cart/OrderSuccess.js";
import MyOrders from "./components/Orders/MyOrders.js";
import OrderDetails from "./components/Orders/OrderDetails.js";
import Dashboard from "./components/Admin/Dashboard.js";
import ProductList from "./components/Admin/ProductList.js";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct.js";
import OrderList from "./components/Admin/OrderList.js";
import ProcessOrder from "./components/Admin/ProcessOrder.js";
import UsersList from "./components/Admin/UsersList.js";
import ProductReviews from "./components/Admin/ProductReviews.js";
import UpdateUser from "./components/Admin/UpdateUser.js";
import NotFound from "./components/layout/Not Found/NotFound.js";
// import Home from "./components/Home/Home.js";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get("/api/v1/stripeapikey");

  //   setStripeApiKey(data.stripeApiKey);
  // }
  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("Error fetching Stripe API Key:", error);
    }
  }

  // const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get("/api/v1/stripeapikey");

  //   setStripeApiKey(data.stripeApiKey);
  // }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOption user={user} />}

      <Routes>
        {/* {!isAuthenticated && <LoginSignUp />} */}

        <Route
          exact
          path="/process/payment"
          element={
            stripeApiKey && (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <PrivateRoute Element={Payment} />
              </Elements>
            )
          }
        />

        {/* <Route
          path="/process/payment"
          element={
            <Elements stripe={loadStripe(stripeApiKey)}>
              <PrivateRoute element={<Payment />} />
            </Elements>
          }
        /> */}

        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        {/* <ProtectedRoute exact path="/account" element={Profile} /> */}
        {/* ----------------------------------------------------------------------------------- */}

        <Route path="/account" element={<PrivateRoute Element={Profile} />} />
        <Route
          exact
          path="/me/update"
          element={<PrivateRoute Element={UpdateProfile} />}
        />
        <Route
          exact
          path="/password/update"
          element={<PrivateRoute Element={UpdatePassword} />}
        />
        <Route
          exact
          path="/password/forgot"
          element={<PrivateRoute Element={ForgotPassword} />}
        />
        <Route
          exact
          path="/password/reset/:token"
          element={<PrivateRoute Element={ResetPassword} />}
        />
        <Route exact path="/login" element={<LoginSignUp />} />

        <Route exact path="/cart" element={<PrivateRoute Element={Cart} />} />
        <Route
          exact
          path="/shipping"
          element={<PrivateRoute Element={Shipping} />}
        />

        <Route
          exact
          path="/success"
          element={<PrivateRoute Element={OrderSuccess} />}
        />
        <Route
          exact
          path="/orders"
          element={<PrivateRoute Element={MyOrders} />}
        />

        <Route
          exact
          path="/order/confirm"
          element={<PrivateRoute Element={ConfirmOrder} />}
        />
        <Route
          exact
          path="/order/:id"
          element={<PrivateRoute Element={OrderDetails} />}
        />
        <Route
          exact
          path="/admin/dashboard"
          element={<PrivateRoute Element={Dashboard} isAdmin={true} />}
        />
        <Route
          exact
          path="/admin/products"
          element={<PrivateRoute Element={ProductList} isAdmin={true} />}
        />
        <Route
          exact
          path="/admin/product"
          element={<PrivateRoute Element={NewProduct} isAdmin={true} />}
        />
        <Route
          exact
          path="/admin/product/:id"
          element={<PrivateRoute Element={UpdateProduct} isAdmin={true} />}
        />
        <Route
          exact
          path="/admin/orders"
          element={<PrivateRoute Element={OrderList} isAdmin={true} />}
        />
        <Route
          exact
          path="/admin/order/:id"
          element={<PrivateRoute Element={ProcessOrder} isAdmin={true} />}
        />
        <Route
          exact
          path="/admin/users"
          element={<PrivateRoute Element={UsersList} isAdmin={true} />}
        />
        <Route
          exact
          path="/admin/user/:id"
          element={<PrivateRoute Element={UpdateUser} isAdmin={true} />}
        />

        <Route
          exact
          path="admin/reviews"
          element={<PrivateRoute Element={ProductReviews} isAdmin={true} />}
        />

        <Route
          path="*"
          element={
            // window.location.pathname === "/process/payment" ? (
            // <Navigate to="/process/payment" />
            // ) : (
            <NotFound />
            // )
          }
        />

        {/* <Route
          path="/process/payment"
          element={
            stripeApiKey && (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <PrivateRoute Element={Payment} />
              </Elements>
            )
          } */}

        {/* (stripeApiKey&&(
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Route
            path="/process/payment"
            element={<PrivateRoute Element={Payment} />}
          />
        </Elements>
        )) */}
        {/* <Route exact path="/process/payment" element={<ProtectedRoute />}>
            <Route exact path="/process/payment" element={<Payment />} />
          </Route> */}
        {/* <Route exact path="/account" element={<ProtectedRoute />}>
          <Route exact path="/account" element={<Profile />} />
        </Route>
        <Route exact path="/me/update" element={<ProtectedRoute />}>
          <Route exact path="/me/update" element={<UpdateProfile />} />
        </Route>
        <Route exact path="/password/update" element={<ProtectedRoute />}>
          <Route exact path="/password/update" element={<UpdatePassword />} />
        </Route>
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/shipping" element={<ProtectedRoute />}>
          <Route exact path="/shipping" element={<Shipping />} />
        </Route>
        <Route exact path="/order/confirm" element={<ProtectedRoute />}>
          <Route exact path="/order/confirm" element={<ConfirmOrder />} />
        </Route> */}
        {/* (stripeApiKey&&(
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Route exact path="/process/payment" element={<ProtectedRoute />}>
            <Route exact path="/process/payment" element={<Payment />} />
          </Route>
        </Elements>
        )) */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
