import React from "react";

const ModalInfo = ({ staff }) => {
  return (
    <div className="modal-info">
      <p>
        <strong>Họ và tên:</strong> {staff.name}
      </p>
      <p>
        <strong>Mã nhân viên</strong> {staff.staffCode}
      </p>
      <p>
        <strong>Ngày sinh:</strong> {staff.dateOfBirth}
      </p>
      <p>
        <strong>Địa chỉ:</strong> {staff.address}
      </p>
      <p>
        <strong>Email:</strong> {staff.email}
      </p>
      <p>
        <strong>Vị trí:</strong> {staff.type}
      </p>
      {/* Thêm các thông tin khác của nhân viên nếu cần */}
    </div>
  );
};

export default ModalInfo;
