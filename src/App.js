/* eslint-disable no-unused-vars */
import "./App.css";
import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/public/Home/Home";
import DetailRestaurant from "./pages/Restaurant/DetailRestaurant";
import Login from "./pages/public/Login/Login";
import Register from "./pages/public/Register/Register";
import BookingInfo from "./pages/Staffs/BookingInfo/BookingInfo";
import Checkin from "./pages/Staffs/Checkin/Checkin";
import Checkout from "./pages/Staffs/Checkout/Checkout";
import StaffLogin from "./pages/Staffs/Login/StaffLogin";
import ManagerLogin from "./pages/Manager/Login/ManagerLogin";
import ManagerHome from "./pages/Manager/ManagerHome/ManagerHome";
import StaffRegister from "./pages/Staffs/Login/StaffRegister";

import { QueryClient, QueryClientProvider} from "react-query";
import CreatedRestaurant from "./pages/Restaurant/CreatedRestaurant";
import CreatedStaffAccount from "./pages/Manager/CreatedStaffAccount/CreatedStaffAccount";

const queryClient = new QueryClient();
export  const AppContext = createContext();

const App = () => {
  const [user, setUser] = useState(null);
  const [restaurant, setRestaurant] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
    <AppContext.Provider value={{user, setUser, restaurant, setRestaurant}}>
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createStaffAccount" element={<CreatedStaffAccount/>}/>
        <Route path="/createdRestaurant" element={<CreatedRestaurant/>}/>
        <Route path="/restaurantdetail" element={<DetailRestaurant />} />
        <Route path="/userlogin" element={<Login />} />
        <Route path="/userregister" element={<Register />} />
        <Route path="/bookinginfo" element={<BookingInfo />} />
        <Route path="/checkin" element={<Checkin />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/loginStaff" element={<StaffLogin />} />
        <Route path="/registerStaff" element={<StaffRegister/>}/>
        <Route path="/managerlogin" element={<ManagerLogin />} />
        <Route path="/managerhome" element={<ManagerHome />} />
      </Routes>
    </BrowserRouter>
    
    </AppContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
