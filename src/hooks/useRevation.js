import axios from "axios";
import { request, requestWithToken } from "../utils/axios-http";

function useRevation() {
  const fetchBookingRequests = async (restaurantId) => {
    try {
      const response = await requestWithToken({
        url: `/reservation/staffGetReservations`
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  return { fetchBookingRequests };
}
export default useRevation;
