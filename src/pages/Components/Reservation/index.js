import React, { useState, useEffect, useContext } from "react";
import { Button } from "antd";
import useRevation from "../../../hooks/useRevation";
import { AppContext } from "../../../App";

const Reservation = () => {
  const [bookingRequests, setBookingRequests] = useState([]);
  const { fetchBookingRequests } = useRevation();
  const restaurantId = "65f8315877dddaa5d035da44";
  const { setNumDependingRe } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBookingRequests(restaurantId);
      setBookingRequests(data);
      setNumDependingRe(data.length); // Di chuyển vào trong useEffect
    };

    fetchData();
  }, [restaurantId, fetchBookingRequests, setNumDependingRe]);

  const handleSubmit = () => {};

  return (
    <div>
      <h2>Danh sách yêu cầu đặt bàn:</h2>
      <table>
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
                  <div>
                    <div
                      style={{
                        display: "inline-flex",
                        marginRight: "50px",
                      }}
                    >
                      <Button
                        type="primary"
                        size="small"
                        onClick={handleSubmit}
                        style={{ marginRight: "0" }}
                      >
                        Đồng ý
                      </Button>
                      <Button
                        type="primary"
                        size="small"
                        danger
                        onClick={handleSubmit}
                        style={{ marginLeft: "0" }}
                      >
                        Từ chối
                      </Button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reservation;
