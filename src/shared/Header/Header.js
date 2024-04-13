import React from 'react'
import "./Header.css";
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd/es/radio';

const Header = () => {
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/');
    };
    const handleStaffLogin = () => {
        navigate('/restaurantLogin');
    };
    const handleUserLogin = () => {
        navigate('/userlogin');
    };


    return (
        <div className='header'>
            <img style={{ cursor: "pointer" }} src={'https://static-assets.diningcity.asia/icons/logo_web_en.png'} onClick={handleLogoClick} ></img>
            <div className='login'>
                <Button onClick={handleStaffLogin} type='primary'>Restaurant Login</Button>
                <span onClick={handleUserLogin} className='iconuser'><i class="fa-regular fa-user"></i></span>
            </div>
        </div>
    )
}

export default Header