import { useQuery } from '@tanstack/react-query'
import { fetchCoins } from '@/api/coinApi'


/**
 * Custom hook to fetch coins with pagination
 * param page - Current page number
 * param perPage - Coins per page
 */
export const useCoins = (page: number = 1, perPage: number = 20) => {
    return useQuery({
        queryKey: ['coins', page, perPage],
        queryFn: () => fetchCoins(page, perPage),
        staleTime: 2 * 60 * 1000, // 2 min
        // Keep previous data while fetching new page
        placeholderData: (previousData) => previousData,
    })
}