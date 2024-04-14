import React, { useState } from "react";
import { Modal, Button, Select } from "antd";

const { Option } = Select;

const ModalCheckin = ({ reservationId }) => {
  const [selectedTable, setSelectedTable] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };
  const Checkin = () => {
    alert("checkin thành công")
  };

  return (
    <>
      <div>
        <h3>Thông tin Checkin</h3>
        <p>Reservation ID: {reservationId}</p>
        <p>Bàn đặt: {selectedTable || "Chưa chọn bàn"}</p>
        {!isEditing ? (
          <Button type="primary" onClick={handleEdit}>
            Chỉnh sửa bàn đặt
          </Button>
        ) : (
          <>
            <Select
              style={{ width: 200 }}
              placeholder="Chọn bàn đặt"
              onChange={(value) => setSelectedTable(value)}
            >
              <Option value="tableID1">Bàn 1</Option>
              <Option value="tableID1">Bàn 2</Option>
              {/* Thêm các option khác tại đây nếu cần */}
            </Select>
            <Button type="primary" onClick={handleSave}>
              Xác nhận
            </Button>
          </>
        )}
                    <Button type="primary" onClick={Checkin} danger>
              Checkin
            </Button>
      </div>
    </>
  );
};

export default ModalCheckin;
