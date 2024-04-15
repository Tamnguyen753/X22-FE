
import "./Header.css";
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd/es/radio';
import { AppContext } from '../../App';
import React, { useContext, useState, useEffect } from "react";

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
    const handleLogout = () => {
        localStorage.removeItem('username');
        // Tùy thuộc vào cách bạn cài đặt, có thể cần thêm các bước khác sau khi logout, như làm mới trang, chuyển hướng, vv.
        // Ví dụ: navigate('/userlogin');
        window.location.reload(); // Refresh trang để cập nhật giao diện
    };

    const { user } = useContext(AppContext);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const username = localStorage.getItem('username');
        setLoggedIn(!!username); // Set trạng thái đăng nhập dựa trên sự tồn tại của username trong localStorage
    }, []);

    return (
        <div className='header'>
            <img style={{ cursor: "pointer" }} src={'https://static-assets.diningcity.asia/icons/logo_web_en.png'} onClick={handleLogoClick} ></img>
            <div className='login-btn'>
                {loggedIn ? (
                    <>
                        <span>{localStorage.getItem('username')}</span>
                        <Button onClick={handleLogout} type='primary'>Đăng xuất</Button>
                    </>
                ) : (
                    <>
                        <Button onClick={handleUserLogin} type='primary'>Đăng nhập</Button>
                        <Button onClick={handleUserRegister} type='primary'>Đăng kí</Button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Header;
