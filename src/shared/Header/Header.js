
import "./Header.css";
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd/es/radio';
import { AppContext } from '../../App';
import React, { useContext } from "react";

const Header = () => {
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/');
    };
    const handleUserRegister = () => {
        navigate('/userregister');
    };
    const handleUserLogin = () => {
        navigate('/userlogin');
    };
    const { user } = useContext(AppContext);
    console.log("user", user);

    return (
        <div className='header'>
            <img style={{ cursor: "pointer" }} src={'https://static-assets.diningcity.asia/icons/logo_web_en.png'} onClick={handleLogoClick} ></img>
            <div className='login-btn'>
                <Button onClick={handleUserLogin} type='primary'>Đăng nhập</Button>
                <Button onClick={handleUserRegister} type='primary'>Đăng kí</Button>

            </div>
        </div>
    )
}

export default Header