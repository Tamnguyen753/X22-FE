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
            url: "/staff/stafflogin",
        });

        const token = res.data;
        
        localStorage.setItem("access_token", token);

        toast.success("login success");
        navigate("/");
        getMe();
    };

    const register = async (data) => {
        const {name, address, dateOfBirth, staffCode, username, password, confirmPassword,type} = data;
        await request({
            data: {
                name, 
                address, 
                dateOfBirth, 
                staffCode, 
                username, 
                password, 
                confirmPassword,
                type,
            },
            method: "post",
            url:"/staff/staffRegister",
        });
        toast.success("create account success!");
        navigate("/stafflogin");
    };

    const getMe = async () => {
        const res = await requestWithToken({
            url: "/staff/me",
        });
        setUser(res.data);
    };

    const logOut = () => {
        localStorage.removeItem("access_token");
        setUser(null);
    };

    return {login, register, getMe, logOut};
};
export default useStaff;

