/* eslint-disable no-unused-vars */
import "./App.css";
import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/public/Home/Home";
import RestaurantDetail from "./pages/public/RestaurantDetail/RestaurantDetail";
import Login from "./pages/public/Login/Login";
import Register from "./pages/public/Register/Register";
import BookingInfo from "./pages/Staffs/BookingInfo/BookingInfo";
import Checkin from "./pages/Staffs/Checkin/Checkin";
import Checkout from "./pages/Staffs/Checkout/Checkout";
import StaffLogin from "./pages/Staffs/Login/StaffLogin";
import ManagerLogin from "./pages/Manager/Login/ManagerLogin";
import ManagerHome from "./pages/Manager/ManagerHome/ManagerHome";
import StaffRegister from "./pages/Staffs/Login/StaffRegister";
import RegisterRestaurant from "./pages/Restaurant/Login/RegisterRestaurant";
import LoginRestaurant from "./pages/Restaurant/Login/LoginRestaurant";

import { QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();
export  const AppContext = createContext();

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <QueryClientProvider client={queryClient}>
    <AppContext.Provider value={{user, setUser,}}>
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurantdetail" element={<RestaurantDetail />} />
        <Route path="/restaurantRegister" element={<RegisterRestaurant/>} />
        <Route path="/restaurantLogin" element={<LoginRestaurant/>} />
        <Route path="/userlogin" element={<Login />} />
        <Route path="/userregister" element={<Register />} />
        <Route path="/bookinginfo" element={<BookingInfo />} />
        <Route path="/checkin" element={<Checkin />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/stafflogin" element={<StaffLogin />} />
        <Route path="/staffRegister" element={<StaffRegister/>}/>
        <Route path="/managerlogin" element={<ManagerLogin />} />
        <Route path="/managerhome" element={<ManagerHome />} />
      </Routes>
    </BrowserRouter>
    
    </AppContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
