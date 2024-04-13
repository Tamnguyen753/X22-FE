import React, { useState, useEffect } from "react";
import "./style.css";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { Button, Modal, Table } from "antd";
import ModalCreate from "./ModalCreate";
import ModalInfo from "./ModalInfo";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Employeemanager = () => {
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const restaurantId = "65f8315877dddaa5d035da44";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaffList = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/staff/${restaurantId}`
        );
        setStaffList(response.data.listStaff);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách nhân viên:", error);
      }
    };

    fetchStaffList();
  }, [restaurantId]);

  const handleDeleteStaff = (staff) => {
    // Xử lý xóa nhân viên ở đây
  };

  const handleViewInfo = (staff) => {
    setSelectedStaff(staff);
    setIsOpenInfo(true);
  };

  return (
    <div className="employee-list">
      <Button
        type="primary"
        danger
        className="add-new"
        // onClick={() => setIsOpenCreate(true)}
        onClick={() => {
          navigate("/createStaffAccount");
        }}
      >
        Thêm nhân viên
      </Button>
      <h1>DANH SÁCH NHÂN VIÊN</h1>
      <Table className="info" dataSource={staffList} rowKey="id">
        <Table.Column title="Tên" dataIndex="name" key="name" />
        <Table.Column
          title="Ngày sinh"
          dataIndex="dateOfBirth"
          key="dateOfBirth"
        />
        <Table.Column title="Địa chỉ" dataIndex="address" key="address" />
        <Table.Column
          title="Thao tác"
          key="action"
          render={(text, record) => (
            <div>
              <Button onClick={() => handleViewInfo(record)}>
                <IoIosAddCircle />
              </Button>
              <Button onClick={() => handleDeleteStaff(record)}>
                <AiOutlineDelete />
              </Button>
            </div>
          )}
        />
      </Table>
      <Modal
        title="Thông tin chi tiết nhân viên"
        open={isOpenInfo}
        onCancel={() => setIsOpenInfo(false)}
        footer={null}
      >
        <ModalInfo staff={selectedStaff} />
      </Modal>
      <Modal
        title="Thêm nhân viên mới"
        open={isOpenCreate}
        onCancel={() => setIsOpenCreate(false)}
        footer={null}
      >
        <ModalCreate />
      </Modal>
    </div>
  );
};

export default Employeemanager;
