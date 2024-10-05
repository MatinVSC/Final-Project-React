import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../services/apiBookings";

export function useDeleteBooking() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
        mutationFn: (id) => deleteBookingApi(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['bookings']
            })
            toast.success('Booking successfully deleted')
        },
        onError: err => toast.error(err.message)
    })

    return {isDeleting, deleteBooking}
}
