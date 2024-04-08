import React, { useState } from "react";
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
import RestaurantDetail from "../../public/RestaurantDetail/RestaurantDetail.js";
import ListMenu from "../../Components/Menu/index.js";
import Reservation from "../../Components/Reservation/index.js";

const ManagerHome = () => {
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
          <div className="info-staff">
            <div class="image">
              <img
                src="https://images.vexels.com/content/145908/preview/male-avatar-maker-2a7919.png"
                alt="Hình ảnh của bạn"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="info">
              <div className="name-staff">Họ và Tên</div>
              <div className="type-staff">Vị trí</div>
            </div>
          </div>
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
        <div className="content">
          {selectedItem ? (
            <div>
              <h3 className="content-name">{selectedItem.name}</h3>
              {selectedItem == 4 && <Employeemanager />}
              {selectedItem == 3 && <Reservation />}
              {selectedItem == 2 && <ListMenu />}
              {selectedItem == 1 && <RestaurantDetail />}
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
