import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../services/apiBookings";
import { useParams } from "react-router-dom";


export function useFetchBooking() {
    const {bookingId} = useParams();

    const { isLoading, error, data: booking } = useQuery({
        queryKey: ['booking', bookingId],
        queryFn: () => getBooking(bookingId),
        retry: false
    })

    return { isLoading, error, booking }
}