import React, { useState, useEffect } from "react";
import { Modal, Button, Select, List, InputNumber } from "antd";
import useTable from "../../../hooks/useTable";
import useRevation from "../../../hooks/useRevation";
import { request } from "../../../utils/axios-http";

const { Option } = Select;

const ModalCheckin = (booking) => {
  const [selectedTable, setSelectedTable] = useState([]);
  const [listTable, setListTable] = useState([]);
  const [menus, setMenus] = useState([]);
  const [selectedMenus, setSelectedMenus] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { getFreeTable } = useTable();
  const { checkinRevation } = useRevation();

  const restaurantId = booking.reservationId.restaurantId;

  const getMenus = async (restaurantId) => {
    try {
      const response = await request({
        url: `/menu`,
        method: "get",
        params: { restaurantId },
      });
      const menuData = response.data.data.map((item) => ({
        ...item,
        quantity: 0,
      }));
      setMenus(menuData);
    } catch (error) {
      console.error("đã xảy ra lỗi", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFreeTable();
        setListTable(data.data ?? []);
        getMenus(restaurantId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [restaurantId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    
  };

  const handleCheckin = async () => {
    try {
      await checkinRevation(booking.reservationId._id, selectedTable, selectedMenus);
    } catch (error) {
      console.log("đã xảy ra lỗi", error);
    }
    alert("checkin thành công");
  };
  return (
    <>
      <div>
        <h3>Thông tin Checkin</h3>
        <p>Tên khách hàng: {booking.reservationId.name}</p>
        <p>Số điện thoại: {booking.reservationId.phone}</p>
        <p>Bàn đặt: {selectedTable.join(", ") || "Chưa chọn bàn"}</p>
        {!isEditing ? (
          <Button type="primary" onClick={handleEdit}>
            Chỉnh sửa đơn hàng
          </Button>
        ) : (
          <>
            <Select
              mode="multiple"
              style={{ width: "100%", marginBottom: "1rem" }}
              placeholder="Danh sách bàn trống"
              onChange={(value) => setSelectedTable(value)}
            >
              {listTable.map((table) => (
                <Option key={table._id} value={table._id}>
                  Bàn số : {table.no}
                </Option>
              ))}
            </Select>

            <h3>Chọn menu và số lượng</h3>
            <List
              dataSource={menus}
              renderItem={(item) => (
                <List.Item>
                  {item.name} - {item.price}$
                  <InputNumber
                    min={0}
                    max={10}
                    defaultValue={item.quantity}
                    onChange={(value) => {
                      const updatedMenus = menus.map((menu) =>
                        menu._id === item._id ? { ...menu, quantity: value } : menu
                      );
                      setSelectedMenus(updatedMenus.filter((menu)=>{return menu.quantity!==0}));
                    }}
                  />
                </List.Item>
              )}
            />

            <Button type="primary" onClick={handleSave}>
              Xác nhận
            </Button>
          </>
        )}
        
        <Button type="primary" onClick={handleCheckin} danger>
          Checkin
        </Button>
      </div>
    </>
  );
};

export default ModalCheckin;
