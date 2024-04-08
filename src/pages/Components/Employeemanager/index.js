import React, { useState } from "react";
import "./style.css";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { Button, Modal, Space, Table } from "antd";
import ModalCreate from "./ModalCreate";
import ModalInfo from "./ModalInfo";

const Employeemanager = () => {
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button size="small" onClick={() => setIsOpenInfo(true)}>
            <IoIosAddCircle />
          </Button>
          <Button size="small" danger>
            <AiOutlineDelete />
          </Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      dateOfBirth: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      dateOfBirth: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      dateOfBirth: 32,
      address: "Sydney No. 1 Lake Park",
    },
  ];

  return (
    <div className="employee-list">
      <Button
        type="primary"
        danger
        className="add-new"
        onClick={() => setIsOpenCreate(true)}
      >
        Thêm nhân viên
      </Button>
      <h1>DANH SÁCH NHÂN VIÊN</h1>
      <div className="info">
        <Table columns={columns} dataSource={data} />
        <Modal
          title="Thêm nhân viên mới"
          visible={isOpenCreate}
          onCancel={() => setIsOpenCreate(false)}
          footer={null}
        >
          <ModalCreate />
        </Modal>
        <Modal
          title="Thông tin nhân viên"
          visible={isOpenInfo}
          onCancel={() => setIsOpenInfo(false)}
          footer={null}
        >
          <ModalInfo />
        </Modal>
      </div>
    </div>
  );
};

export default Employeemanager;
