import { request } from '../utils/axios-http';

const useAuth = () => {
    const booking = async (data) => {
        try {
            const { name, phone, time, reservationDate, quantity, restaurantId, acceptedDate, rejectedDate, checkInDate, checkOutDate } = data;
            const bookingResponse = await request({
                data: {
                    name,
                    phone,
                    time,
                    reservationDate,
                    quantity,
                    restaurantId,
                    acceptedDate,
                    rejectedDate,
                    checkInDate,
                    checkOutDate
                },
                method: "post",
                url: "/reservation/userCreateReservation"
            });
            console.log(bookingResponse);
            return bookingResponse;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
    return booking;
};

export default useAuth;
