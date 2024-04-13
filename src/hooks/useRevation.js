import axios from "axios";

function useRevation() {
  const fetchBookingRequests = async (restaurantId) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/reservation/${restaurantId}`
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };
  return { fetchBookingRequests };
}
export default useRevation;
