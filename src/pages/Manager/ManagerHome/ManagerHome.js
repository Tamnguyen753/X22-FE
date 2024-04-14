import React, { useContext, useState } from "react";
import "./style.css";
import Employeemanager from "../../Components/Employeemanager";
import Header from "../../Components/Employeemanager/Header/Header.js";
import { Menu } from "antd";
import {
  InfoCircleOutlined,
  MenuFoldOutlined,
  UserOutlined,
  WechatWorkOutlined,
} from "@ant-design/icons";

import ListMenu from "../../Components/Menu/index.js";
import AppContext from "antd/es/app/context.js";
import BookingInfo from "../../Staffs/BookingInfo/BookingInfo.js";
import Checkin from "../../Staffs/Checkin/Checkin.js";
// import RestaurantDetail from "../../public/RestaurantDetail/RestaurantDetail.js";
const ManagerHome = () => {
  const { user } = useContext(AppContext);
  console.log("aaa", user);
  const [selectedItem, setSelectedItem] = useState(1);
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const Items = [
    // { id: 1, name: "Thông tin nhà hàng" },
    // { id: 2, name: "Thực đơn" },
    // { id: 3, name: "Yêu cầu đặt bàn" },
    // { id: 4, name: "Thông tin nhân viên" },
    getItem("Thông tin nhà hàng", "1", <InfoCircleOutlined />),
    getItem("Danh sách thực đơn", "2", <MenuFoldOutlined />),
    getItem("Yêu cầu đặt bàn", "3", <WechatWorkOutlined />),
    getItem("Thông tin nhân viên", "4", <UserOutlined />),
    getItem("Checkin/Checkout đơn hàng", "5", <WechatWorkOutlined />),
  ];
  const onClick = (e) => {
    setSelectedItem(e.key);
    console.log(e.label);
  };
  return (
    <div className="management-form">
      <Header />
      <div className="app-container ">
        <div className="categories">
          <Menu
            className="button"
            onClick={onClick}
            style={{
              width: "100%",
            }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={Items}
            inlineIndent={0}
          />
        </div>
        <div className="management-content">
          {selectedItem ? (
            <div>
              <h3 className="content-name">{selectedItem.name}</h3>
              {selectedItem == 4 && <Employeemanager />}
              {selectedItem == 3 && <BookingInfo />}
              {selectedItem == 2 && <ListMenu />}
              {selectedItem == 5 && <Checkin />}
              {/* {selectedItem == 1 && <RestaurantDetail />} */}
            </div>
          ) : (
            <h3 className="content-name">Tìm danh mục muốn xem</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerHome;
