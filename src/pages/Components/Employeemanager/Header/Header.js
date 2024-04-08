import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { Button } from "antd";
const Header = () => {
  return (
    <div className="wrapper">
      <div className="logo">
        <img
          src="https://static.ybox.vn/2020/7/2/1594126270885-1577762085284-1571027713600-logo%20techkids%20moi%207%20(1)-05.png"
          style={{ width: "55%" }}
        />
      </div>
      <h1 className="title"> Quản lí nhà hàng </h1>
      <div className="login-logout">
        <ul>
          <Button type="primary">
            <Link to={"/stafflogin"}>Đăng nhập</Link>
          </Button>
        </ul>
        <ul>
          <Button type="primary" danger>
            <Link to={"/staffRegister"}>Đăng ký</Link>
          </Button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
