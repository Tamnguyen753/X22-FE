import React, { useState, useEffect } from "react";
import { request } from "../../../utils/axios-http";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const ListMenu = () => {
  const [menuData, setMenuData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Parse user from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const restaurantId = user.restaurantId;

    const fetchData = async () => {
      try {
        const response = await request({
          url: "/menu",
          method: "get",
          params: { restaurantId },
        });
        setMenuData(response.data.data);
      } catch (error) {
        console.error("đã xảy ra lỗi", error);
      }
    };

    if (restaurantId) {
      fetchData();
    } else {
      console.warn("No restaurantId found in localStorage.");
    }
  }, []);

  return (
    <div className="menus-list" style={{position:"relative"}}>
      <Button
        type="primary"
        style={{width:"150px",  marginBottom: "20px",position:"absolute",right:"0",top:"-1px" }}
        onClick={() => navigate("/createMenu")}
      >
        Thêm món ăn
      </Button>
      <h2>Menu List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Unit</th>
            <th>Description</th>
            <th>Discount (%)</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {menuData.map((menu, index) => (
            <tr key={index}>
              <td>{menu.name}</td>
              <td>{menu.type}</td>
              <td>${menu.price}</td>
              <td>{menu.unit}</td>
              <td>{menu.describe}</td>
              <td>{menu.discount}%</td>
              <td>
                <img src={menu.image} alt={menu.name} style={{ maxWidth: '100px' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListMenu;
