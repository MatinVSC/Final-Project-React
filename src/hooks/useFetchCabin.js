import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../services/apiCabins";


export function useFetchCabin() {
    const { isLoading, data: cabins } = useQuery({
        queryKey: ['cabins'],
        queryFn: getCabins
    })

    return { isLoading, cabins }
}