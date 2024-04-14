import axios from "axios";
import { request, requestWithToken } from "../utils/axios-http";

function useRevation() {
  const fetchBookingRequests = async () => {
    try {
      const response = await requestWithToken({
        url: `/reservation/staffGetReservations`,
        method:"post"
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const acceptRevation = async(reservationId)=>{
    try {
      const response = await requestWithToken({
        url: `/reservation/accept-reservation/:${reservationId}`,
        method:"post"
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  return { fetchBookingRequests,acceptRevation };
}
export default useRevation;
