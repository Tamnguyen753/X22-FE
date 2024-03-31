/* eslint-disable no-unused-vars */
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import { request, requestWithToken } from "../utils/axios-http";
import { useContext } from "react";
import {AppContext} from "../App";

function useStaff(){
    const navigate = useNavigate();
    const {setUser} = useContext(AppContext);

    const login = async (data) => {
        const {username, password} = data;

        const res = await request({
            data: {
                username, 
                password
            },
            method: "post",
            url: "http://localhost:3000/api/staff/loginStaff",
        });

        const {accessToken, type} = res.data;
        // console.log( accessToken, type);
        
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("type", type);

        toast.success("Đăng nhập thành công!");
        navigate("/createdRestaurant");
        // navigate("/createStaffAccount");
        // navigate("/");
        // getMe();
    };

    const register = async (data) => {
        const {name, email, username, password, confirmPassword} = data;
        await request({
            data: {
                name, 
                email, 
                username, 
                password, 
                confirmPassword,
            },
            method: "post",
            url:"http://localhost:3000/api/staff/registerStaff",
        });
        toast.success("Đăng kí thành công!");
        navigate("/loginStaff");
    };

    const getMe = async () => {
        const res = await requestWithToken({
            url: "/staff/me",
        });
        setUser(res.data);
    };

    const logOut = () => {
        localStorage.removeItem("accessToken");
        setUser(null);
    };

    const createdStaffAccount = async (data) => {
        const {name, email, address, dateOfBirth, staffCode, username, password, confirmPassword} = data;

        const typeStaff = localStorage.getItem("type");
        await requestWithToken({
            data: {
                name, 
                email, 
                address, 
                dateOfBirth, 
                staffCode, 
                username, 
                password, 
                confirmPassword,
            },
            method: "post",
            url: "http://localhost:3000/api/staff/createStaffAccount",
        }, typeStaff);

        toast.success("Tạo tài khoản nhân viên thành công!");
        navigate("/restaurantdetail");

    };

    return {login, register, getMe, logOut, createdStaffAccount};
};
export default useStaff;

