import { useQuery } from '@tanstack/react-query'
import { fetchTrendingCoins } from '@/api/coinApi'

/**
 * Custom hook to fetch trending coins
 */
export const useTrending = () => {
  return useQuery({
    queryKey: ['trending'],
    queryFn: fetchTrendingCoins,
    
    // Trending changes slowly, cache for 10 minutes
    staleTime: 10 * 60 * 1000,
  })
}