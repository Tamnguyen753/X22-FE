import React, { useState, useEffect } from "react";
import { Button } from "antd";
import useRevation from "../../../hooks/useRevation";
import { toast } from "react-toastify";

const BookingInfo = () => {
  const [bookingRequests, setBookingRequests] = useState([]);
  const { fetchBookingRequests, acceptRevation, rejectRevation, rePendingRevation } = useRevation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBookingRequests();
        setBookingRequests(data.data ?? []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchBookingRequests();
      setBookingRequests(data.data ?? []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAccept = async (reservationId, index) => {
    try {
      await acceptRevation(reservationId);
      toast.success("Đã xác nhận đơn hàng");
      updateStatus(index, "accepted");
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (reservationId, index) => {
    try {
      await rejectRevation(reservationId);
      toast.error("Đã từ chối đơn hàng");
      updateStatus(index, "rejected");
    } catch (error) {
      console.log(error);
    }
  };
  const handlePending = async (reservationId, index) => {
    try {
      await rePendingRevation(reservationId);
      toast.success("Hoàn tác thành công");
      updateStatus(index, "pending");
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = (index, status) => {
    const updatedRequests = [...bookingRequests];
    updatedRequests[index].status = status;
    setBookingRequests(updatedRequests);
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
          {bookingRequests.length > 0 &&
            bookingRequests.map((bookingRequest, index) => (
              <tr key={index}>
                <td>{bookingRequest.name}</td>
                <td>{bookingRequest.phone}</td>
                <td>{bookingRequest.quantity}</td>
                <td>{bookingRequest.status}</td>
                <td>{new Date(bookingRequest.reservationDate).toLocaleDateString()}</td>
                <td>
                  <div style={{ display: "inline-flex" }}>
                    {bookingRequest.status !== "accepted" && bookingRequest.status !== "rejected" && (
                      <>
                        <Button
                          type="primary"
                          size="small"
                          onClick={() => handleAccept(bookingRequest._id, index)}
                          style={{ marginRight: "10px" }}
                        >
                          Đồng ý
                        </Button>
                        <Button
                          type="primary"
                          size="small"
                          danger
                          onClick={() => handleReject(bookingRequest._id, index)}
                        >
                          Từ chối
                        </Button>
                      </>
                    )}
                    {bookingRequest.status !== "pending" && (
                      <Button type="primary" size="small" style={{ marginRight: "10px" }} onClick={() => handlePending(bookingRequest._id, index)}>
                        Hoàn tác
                      </Button>
                    )}
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
