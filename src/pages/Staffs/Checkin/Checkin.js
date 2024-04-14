import { Button,Modal } from "antd";
import React, { useState } from "react";
import "./style.css";
import ModalCheckin from "./Modalcheckin";
const Checkin = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
  const data = [
    {reservationId:"1",
      userId: "615a0fc0e9c5412abc123456", // ObjectId của user
      name: "Nguyen Van A",
      phone: "0123456789",
      quantity: 4,
      status: "pending",
      reservationDate: new Date("2024-04-15T10:00:00Z"),
      restaurantId: "615a0fc0e9c5412abc789012", // ObjectId của restaurant
      tables: ["615a0fc0e9c5412abc234567"], // Mảng ObjectId của tables
      menus: [
        {
          menuId: "615a0fc0e9c5412abc345678", // ObjectId của menu
          quantity: 2,
          price: 150000,
          discount: 20000,
          total: 280000,
        },
        {
          menuId: "615a0fc0e9c5412abc456789",
          quantity: 3,
          price: 200000,
          discount: 25000,
          total: 575000,
        },
      ],
    },
    {reservationId:"2",
      userId: "615a0fc0e9c5412abc123457",
      name: "Tran Thi B",
      phone: "0987654321",
      quantity: 2,
      status: "accepted",
      reservationDate: new Date("2024-04-16T12:00:00Z"),
      acceptedDate: new Date("2024-04-15T12:30:00Z"),
      checkInDate: Date(""),
      checkOutDate: Date(""),
      restaurantId: "615a0fc0e9c5412abc789013",
      tables: ["615a0fc0e9c5412abc234568"],
      menus: [
        {
          menuId: "615a0fc0e9c5412abc345679",
          quantity: 1,
          price: 250000,
          discount: 30000,
          total: 220000,
        },
      ],
    },
    {reservationId:"3",
      userId: "615a0fc0e9c5412abc123457",
      name: "Tran Thi c",
      phone: "1111111111",
      quantity: 2,
      status: "accepted",
      reservationDate: new Date("2024-04-16T12:00:00Z"),
      acceptedDate: new Date("2024-04-15T12:30:00Z"),
      checkInDate: Date(""),
      checkOutDate: Date,
      restaurantId: "615a0fc0e9c5412abc789013",
      tables: ["615a0fc0e9c5412abc234568"],
      menus: [
        {
          menuId: "615a0fc0e9c5412abc345679",
          quantity: 1,
          price: 250000,
          discount: 30000,
          total: 220000,
        },
      ],
    },
  ];
  const handleCheckin = (reservationId) => {
    setSelectedReservation(reservationId);
    setIsOpen(true);
  };
  const handleCheckout = (reservationId) => {
    setSelectedReservation(reservationId);
  };

  return (
    <div className="checkin-form">
      <table className="reservation-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Số điện thoại</th>
            <th>Ngày đặt bàn</th>
            <th>Ngày chấp nhận</th>
            <th>Trạng thái</th>
            <th>Thời gian Checkin</th>
            <th>Thời gian Checkout</th>
            <th>Bàn ăn</th>
            <th>Menus</th>
            <th>Thanh toán</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((booking, index) => (
            <tr key={index}>
              <td>{booking.name}</td>
              <td>{booking.phone}</td>
              <td>{new Date(booking.reservationDate).toLocaleString()}</td>
              <td>{new Date(booking.acceptedDate).toLocaleString()}</td>
              <td>{booking.status}</td>
              <td>
                {booking.checkInDate
                  ? new Date(booking.checkInDate).toLocaleString()
                  : "Chưa Checkin"}
              </td>
              <td>
                {booking.checkOutDate
                  ? new Date(booking.checkOutDate).toLocaleString()
                  : "Chưa Checkout"}
              </td>
              <td>
                <ul>
                  {booking.tables.map((tableId, index) => (
                    <li key={index}>{tableId}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {booking.menus.map((menu, index) => (
                    <li key={index}>
                      Menu ID: {menu.menuId},<br />
                      Quantity: {menu.quantity},<br />
                      Price: ${menu.price},<br />
                      Discount: ${menu.discount},<br />
                      Total: ${menu.total}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                ${booking.menus.reduce((total, menu) => total + menu.total, 0)}
              </td>
              <th>
            {!booking.checkInDate && !booking.checkOutDate && (
              <Button type="primary" onClick={() => handleCheckin(booking.reservationId)}>Checkin</Button>
            )}
            {!!booking.checkInDate && !booking.checkOutDate && (
              <Button type="primary" danger onClick={() => handleCheckout(booking.reservationId)}>
                Checkout
              </Button>
            )}
          </th>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        title="Thực hiện checkin"
        visible={isOpen} // Sửa thành visible
        onCancel={() => setIsOpen(false)}
        footer={null}
      >
        <ModalCheckin reservationId={selectedReservation} />
      </Modal>
    </div>
  );
};

export default Checkin;
