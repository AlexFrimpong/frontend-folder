import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductDetailsPage,
  ProfilePage,
  CreateShopPage,
  ShopLoginPage,
  ShopDashboardPage,
  ShopCreateProductPage,
  ShopCreateEventPage,
  ShopAllProductPage,
  AllCouponsPage
} from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProtectedRoute from "./UserProtectedRoute";
import SellerProtectedRoute from "./sellerProtectedRoute";
import { ShopHomePage } from "./ShopRoute"
import ShopAllEventsPage from "./pages/shop/AllShopEventsPage";
//import axios from "axios"
import { useDispatch } from "react-redux";
import { getUserStatus } from "./slices/features/auth/userAuthSlice";

const App = () => {

  //axios.defaults.withCredentials = true
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserStatus())
  }, [dispatch])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:name" element={<ProductDetailsPage />} />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/Faq" element={<FAQPage />} />
          <Route path="/profile" element={<UserProtectedRoute>
            < ProfilePage />
          </UserProtectedRoute>} />
          {/* shop routes */}
          <Route path="/create-shop" element={<CreateShopPage />}
          />
          <Route path="/login-shop" element={<ShopLoginPage />} />
          <Route path="/shop/:id" element={<SellerProtectedRoute>
            <ShopHomePage />
          </SellerProtectedRoute>} />
          <Route path="/dashboard" element={<SellerProtectedRoute>
            <ShopDashboardPage />
          </SellerProtectedRoute>} />
          <Route path="/dashboard-create-products" element=
            {<ShopCreateProductPage />}
          />
          <Route path="/dashboard-all-products" element=
            {<ShopAllProductPage />}
          />
          <Route path="/dashboard-create-events" element=
            {<ShopCreateEventPage />}
          />
          <Route path="/dashboard-create-coupons" element=
            {<AllCouponsPage />}
          />
          <Route
            path="/dashboard-all-events"
            element={
              <SellerProtectedRoute>
                <ShopAllEventsPage />
              </SellerProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </>
  );
};

export default App;
