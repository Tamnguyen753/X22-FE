import React, { useState } from "react";
import axios from "axios";

const ModalInfo = ({ data }) => {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  const showInfo = async (data) => {
    const { username } = data;
    try {
      const response = await axios.get("http://localhost:3000/api/staff/", {
        params: {
          username,
        },
      });
      setInfo(response.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Đã xảy ra lỗi khi lấy thông tin nhân viên.");
    }
  };

  return (
    <div className="modal-info">
      {error && <div className="error">{error}</div>}
      {info && (
        <div className="info">{/* Hiển thị thông tin nhân viên ở đây */}</div>
      )}
    </div>
  );
};

export default ModalInfo;
