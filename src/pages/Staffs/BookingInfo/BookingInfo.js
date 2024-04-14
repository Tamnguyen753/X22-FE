import React, { useState, useEffect } from "react";
import { Button } from "antd";
import useRevation from "../../../hooks/useRevation";

const BookingInfo = () => {
  const [bookingRequests, setBookingRequests] = useState([]);
  const { fetchBookingRequests, acceptRevation } = useRevation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBookingRequests();
      setBookingRequests(data ?? []);
    };

    fetchData();
  }, []);

  const handleAccept = async (reservationId) => {
    try {
      await acceptRevation(reservationId);
      // Refresh booking requests after accepting
      const data = await fetchBookingRequests();
      setBookingRequests(data ?? []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (reservationId) => {
    try {
      // Implement reject reservation functionality if needed
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="reservation">
      <h2>Danh sách yêu cầu đặt bàn:</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Số điện thoại</th>
            <th>Số lượng người</th>
            <th>Trạng thái</th>
            <th>Ngày đặt</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {bookingRequests &&
            bookingRequests.map((bookingRequest, index) => (
              <tr key={index}>
                <td>{bookingRequest.name}</td>
                <td>{bookingRequest.phone}</td>
                <td>{bookingRequest.quantity}</td>
                <td>{bookingRequest.status}</td>
                <td>{bookingRequest.reservationDate}</td>
                <td>
                  <div style={{ display: "inline-flex" }}>
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => handleAccept(bookingRequest.reservationId)}
                      style={{ marginRight: "10px" }}
                    >
                      Đồng ý
                    </Button>
                    <Button
                      type="primary"
                      size="small"
                      danger
                      onClick={() => handleReject(bookingRequest.reservationId)}
                    >
                      Từ chối
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingInfo;
