import React, { useContext } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, Tooltip } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import useStaff from "../../../../hooks/useStaff";
import { AppContext } from "../../../../App";

const Header = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const { logOut } = useStaff();
  return (
    <div className="header">
      <div className="wrapper">
        <div className="logo">
          <img
            src="https://static.ybox.vn/2020/7/2/1594126270885-1577762085284-1571027713600-logo%20techkids%20moi%207%20(1)-05.png"
            style={{ width: "90px", height: "50px" }}
          />
        </div>
        {user ? (
          <div className="items">
            <div className="staff-icon">
              <Tooltip title={user.type} placement="bottom">
                <Avatar
                  style={{
                    backgroundColor: "#87d068",
                  }}
                  icon={<UserOutlined />}
                />
              </Tooltip>
              <div className="staff-info">
                <span>{user.name}</span>
              </div>
            </div>
            <div>
              <Button type="primary" danger onClick={logOut}>
                Đăng xuất
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Button
              type="primary"
              onClick={() => {
                navigate("/loginStaff");
              }}
            >
              Đăng nhập
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
